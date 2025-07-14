import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { currency } from "../App";
import assets from "../assets/assets";
// get the token becuase we gave the token when we hit the endpoint to get the values from the database
const Orders = ({ token }) => {
  // To stores orders we got from the database
  const [orders, setOrders] = useState([]);
  // To fetch all the orders
  const fetchAllOrders = async () => {
    // if token is not there return the null
    if (!token) {
      return null;
    }
    // if token is there
    try {
      // Get the values from the database
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      // console.log(response.data);  // Working fine

      // if the data is there and gives success
      if (response.data.success) {
        // store the orders into the setOrders
        setOrders(response.data.orders);
      } else {
        console.error(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // To change the status in the database as admin change the order status on the admin panel
  const statusHandler = async (e, orderId) => {
    try {
      // To get the value fromm the given endpoint
      // We pass the orderId and status becuase when this req goes to backend that time we want to hit that perticuler Id and get that time status
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      // If we are able to get the value(if the status has been updated)
      if (response.data.success) {
        // Fetch all the orders again to update the status in the frontend
        await fetchAllOrders();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    // Order page
    <div>
      <h3>Order Page</h3>
      <div>
        {/* Loop through all the orders */}
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            {/* To show the image of the parcel */}
            <img src={assets.parcel_icon} alt="" className="w-12" />
            <div>
              {/* display the items */}
              <div>
                {/* here we passed item.everything is from order we stored, get from backend*/}
                {order.items.map((item, index) => {
                  // The item is the last item
                  if (index === order.items.length - 1) {
                    return (
                      // display the name, quantity and size
                      <p className="py-0.5" key={index}>
                        {item.name} X {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                    // The item is not the last item
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} X {item.quantity} <span>{item.size},</span>
                      </p>
                    );
                  }
                })}
              </div>
              {/* We will show the address of the user */}
              {/* order.everthing here we get the value from order which we got from the database */}
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              {/* display the address */}
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipCode}
                </p>
              </div>
              {/* display the phone number */}
              <p className="text-sm sm:text-[15px]">{order.address.phone}</p>
            </div>
            <div>
              {/* display the items, method, payment, date */}
              <p className="text-sm sm:text-[15px]">
                Items : {order.items.length}
              </p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              {/* if true show done else show pending */}
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              {/* give the data according to the date inside the database */}
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            {/* display the amount with currency */}
            <p>
              {currency}
              {order.amount}
            </p>
            {/* To change the status of the order for admin purpose */}
            {/* Now we give the statusHandler for the if the admin change the orderstatus its going to change inside the dabase as well */}
            {/* We pass the value is order.status which displays current status */}
            <select 
              className="p-2 font-semibold"
              value={order.status}
              onChange={(e) => statusHandler(e, order._id)}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Order Shipped">Order Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
