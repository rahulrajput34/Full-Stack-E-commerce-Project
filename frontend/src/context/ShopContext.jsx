import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * A context that provides state and functionality for managing products and cart items.
 *
 * @type {React.Context}
 */
export const ShopContext = createContext();

/**
 * Context provider component that manages product data, cart operations,
 * and authentication tokens for the application.
 *
 * @function ShopContextProvider
 * @param {Object} props - The component's props.
 * @returns {JSX.Element} The context provider for the shop.
 */
const ShopContextProvider = (props) => {
  // Global currency and delivery fee configuration
  const currency = "$";
  const deliveryFees = 5;

  // Base URL for the backend (from environment variables)
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // State variables
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  /**
   * Adds an item to the cart with the selected size.
   * Also updates the backend if a user token is available.
   *
   * @async
   * @function addToCart
   * @param {string} itemId - The item's identifier.
   * @param {string} size - The size of the item.
   */
  const addToCart = async (itemId, size) => {
    if (!token) {
      toast.info("Please login to add item to cart");
      return;
    }

    if (!size) {
      toast.error("Please select a size of product");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
        toast.success("Item added to cart");
      } catch (error) {
        console.error(error);
        toast.error("Failed to add item to cart");
      }
    }
  };

  /**
   * Retrieves the total count of items in the cart.
   *
   * @function getCartCount
   * @returns {number} The total quantity of all items in the cart.
   */
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size] || 0;
      }
    }
    return totalCount;
  };

  /**
   * Updates the quantity of a specific cart item.
   * Also updates the backend if a user token is available.
   *
   * @async
   * @function updateQuantity
   * @param {string} itemId - The item's identifier.
   * @param {string} size - The item's size.
   * @param {number} quantity - The new quantity.
   */
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to update quantity");
      }
    }
  };

  /**
   * Calculates the total amount for all items in the cart.
   *
   * @function getCartAmount
   * @returns {number} The total cost of all cart items.
   */
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemData = products.find((product) => product._id === itemId);
      if (!itemData) continue;

      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          totalAmount += itemData.price * quantity;
        }
      }
    }
    return totalAmount;
  };

  /**
   * Fetches product data from the backend.
   *
   * @async
   * @function getProductsData
   */
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast.error(error.message);
    }
  };

  /**
   * Retrieves the user's cart data from the backend and updates the local cart state.
   *
   * @async
   * @function getUserCart
   * @param {string} userToken - The user's authentication token.
   */
  const getUserCart = async (userToken) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token: userToken } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to get cart data");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!token && savedToken) {
      setToken(savedToken);
      getUserCart(savedToken);
    }
  }, [token]);

  const value = {
    products,
    currency,
    deliveryFees,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
