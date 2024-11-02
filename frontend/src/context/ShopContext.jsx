import { useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// use context api for getting all the value of products from assest.js
export const ShopContext = createContext();

// creating for get values from
const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryFees = 5;
  // For backend URL
  // To show where to fetch
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // For storing the all fetched data
  const [products, setProducts] = useState([]);
  // Here we set the true so that the by default there is a search bar in our webpage
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  // To store the product we got from the backend
  const navigate = useNavigate();
  // console.log(token);

  // ***********      ADD TO CART functionality     *****************
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size of product");
      return;
    }
    // Clone the current cart data to avoid direct mutation
    let cartData = structuredClone(cartItems);

    // Check if the item already exists in the cart
    if (cartData[itemId]) {
      // Check if the specific size of the item exists in the cart
      if (cartData[itemId][size]) {
        // If it exists, increase the quantity by 1
        cartData[itemId][size] += 1;
      } else {
        // If the size doesn't exist, add the size with quantity 1
        cartData[itemId][size] = 1;
      }
    } else {
      // If the item doesn't exist, create a new entry for the item
      cartData[itemId] = {};
      // Add the size with quantity 1
      cartData[itemId][size] = 1;
    }
    // Update the cart state with the new data
    setCartItems(cartData);

    // Conntect to the backend
    // If token is available
    if (token) {
      //console.log(token);     // Just for checkingthe token is working or not
      try {
        // Send a POST request to add the item to the database
        // Item id and size are for which Id needed
        // Token will use this token to verify the user.
        const response = await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
        console.log(response);
        // If it will added then show the success message
        toast.success("Item added to cart");
      } catch (error) {
        // if not then error
        console.log(error);
        toast.error("Failed to add item to cart");
      }
    } else {
      // Use is not logged in
      toast.info("Please login to add item to cart");
    }
  };

  // *************    Get Cart Count Logic      ****************
  // When we add the item or remove the item that time the value of count should be change
  // logic for this is below code
  const getCartCount = () => {
    // Start with a total count of zero to track the number of items in the cart
    let totalCount = 0;

    // Iterate over each item in the cart
    for (const items in cartItems) {
      // For each item, loop through its available sizes
      for (const item in cartItems[items]) {
        try {
          // If the quantity for a specific size is greater than zero, add it to the total count
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          // Catch and log any errors that might occur during the counting process
          console.log(error);
        }
      }
    }

    // Return the final total count of all items in the cart
    return totalCount;
  };

  // ***********   Update quntity **********
  const updateQuantity = async (itemId, size, quantity) => {
    // Clone the current cart data to avoid direct mutation
    let cartData = structuredClone(cartItems);

    // Update the quantity for the specified item and size
    cartData[itemId][size] = quantity;

    // Update the cart state with the new data
    setCartItems(cartData);

    // If token is available means we are logged-In
    if (token) {
      try {
        // Send a POST request to update the quantity in the database
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error("Failed to update quantity");
      }
    }
  };

  // **********    Total amount    ***************
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            let itemPrice = itemInfo.price;
            let itemQuantity = cartItems[items][item];
            totalAmount += itemPrice * itemQuantity;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    // Calculate the tax (13% of totalAmount)
    // const tax = totalAmount * 0.13;
    // // Add tax to the total amount
    // totalAmount += tax;

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      // Fetching the product data from the backend (server)
      const response = await axios.get(`${backendUrl}/api/product/list`);
      // console.log(response.data);  // working fine
      // console.log(response.data.);

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        console.log("Error fetching product data");
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching product data:");
      toast.error(error.message);
    }
  };

  // When we are refreshing the webpage that time the prodcuts inside the cart has been removed
  // To come up with this problem we gonna use the below functionality
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        {
          headers: { token },
        }
      );
      // Means we have recieved the cart data
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to get cart data");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  // If the user does not have that token but has it saved localstorage, the app will take that token from the localstorage and use it so that you do not need to login again even if you refresh the webpage
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

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
