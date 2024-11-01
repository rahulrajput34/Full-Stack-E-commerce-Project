import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function Orders() {
  // using the backend url and token we fetch the order from the backend
  // we need to pass the token because in the routes endpoint we passed the userAuth middleware inside it in backend
  const {backendUrl, token, currency} = useContext(ShopContext);
  // and store this value inside it which comes from the backend
  const [orderData, setOrderData] = useState([]);
  // To load all the orders from the backend
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null  
      }
      // get the value from the backends
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers: {token}})
      // console.log(response.data); // working fine

      // Now disaply the order we gonna store it inside the orderData array
      if (response.data.success) {
        // first we push all the order details into the allOrdersItem
        let allOrdersItem = [];
        // this loop will take these four properties and store it inside the allOrdersItem
        // we did data.orders.map because this is how our jason data looks like
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          })
        })
        // console.log(allOrdersItem);  // Working fine
        setOrderData(allOrdersItem);
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Order.jsx || Error in the getting value from backend"); 
    }
  }
  // We have the run this function when the page gets loaded
  useEffect(() => {
    loadOrderData();
  }, [token])
  
  // Now we want to display all the order to the admin panel so first we will go to order controller file and write all the logic over there
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {/* Displays the orders data */}
        {
          // Get the value from the orderData
          orderData.map((item, index)=>(
            <div className='py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4' key={index}>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.images[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quntity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                {/* Whenever someone wants to track an order we will use this button which will call the loadOrderData function and the current status from database gets display */}
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders