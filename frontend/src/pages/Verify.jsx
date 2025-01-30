import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Verify() {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);

  // Parse URL parameters
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  // Verify payment based on URL parameters
  const verifyPayment = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      toast.error("Payment verification failed.");
    }
  };

  // Trigger verification on component load
  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div></div>;
}

export default Verify;
