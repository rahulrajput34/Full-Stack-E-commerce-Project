import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Verify() {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  //to get the param from the url
  // Because if success is true then its going to show inside the URL
  // TODO: This verify method is not good, we use the Webhook-Based Verification
  const [searchParams, setSearchParams] = useSearchParams();

  // To get the true or false from URL
  const success = searchParams.get("success");
  // To get the orderId from the URL
  const orderId = searchParams.get("orderId");

  // to verify the payment
  const verifyPayment = async () => {
    try {
      // if token is not available then return null
      if (!token) {
        return null;
      }
      // get the reponse from backend
      // success and orderId we got from the url
      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        // If the payment is successful, clear the cart and navigate to the orders page
        setCartItems({});
        navigate("/orders");
      } else {
        // If the payment is not successful, navigate to the cart page
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // We want to execute this function as soon as this page open
  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
}

export default Verify;
