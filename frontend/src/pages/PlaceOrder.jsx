import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify'
import axios from 'axios'

function PlaceOrder() {
  // give cod over here as default
  const [method, setMethod] = useState('cod');
  //getting from context
  const  {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, deliveryFees, products} = useContext(ShopContext);
  // Here's where we have get the from data to intergrates the backend
  // We have the empty values, but we will update them when ever the input field gets change
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });
  // To store the value in the above object
  const onChangeHandler = (event) => {
    // Whenever user pass the name and value to the input filed, it will stores here as well
    const name = event.target.name;
    const value = event.target.value;
    // Setting these values inside the FromData which we passed
    // We are changing the name with the value
    setFormData(data => ({...data,[name]:value}))
  };  // we are going to pass this one in all the inputs so that when ever anytthing passed by user, passed value is going to store into the input form original value(here its formData)

  // On Submit function for this form
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // In this array we will store all the products from our cartItems
      let orderItems = [];
      // get the value of which product inside the cart with qunity and size from the cart and store it inside the empty array
      for(const items in cartItems){
        for(const item in cartItems[items]){
          // if product is added to the cart and the quntity is greater than 0
          if(cartItems[items][item] > 0){
            // Using the structuredClone we can create the copy of any object in another varibale
              const itemInfo = structuredClone(products.find(product => product._id === items));
              // if itemInfo is available
              if(itemInfo){
                // If yes, then we gonna store the size and the quntity inside that info
                itemInfo.size = item;
                itemInfo.quantity = cartItems[items][item];
                // Then we pass itemInfo inside our orderItem emtpy array
                orderItems.push(itemInfo);
              }
          }
        }
      }
      // console.log(orderItems); // working fine
      // to move it all the info to the backend as needed in viewModel
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFees,
        method: method,
      }

      // TO choose the different payment methods
      switch (method) {
        // API calls for COD
        case 'cod':
          // send the orderData to the backend
          // one orderCollection is going to made into the database
          const response = await axios.post(backendUrl + "/api/order/place", orderData, {headers: {token}});
          // console.log(response.data);  // Working fine
          
          // If the order is placed successfully
          if(response.data.success){
            // In the frontend we are clearing the cartData if placed successfully and navigate the user on the orders page
            setCartItems({});
            navigate('/orders');  // Working fine, now display the orders which is present inside the databse in orderconroller in the backend and orders on frontend
          } else{
            toast.error(response.data.message);
          }
          break;
        // For stripe method
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + "/api/order/stripe", orderData, {headers: {token}});
          if(responseStripe.data.success) {
            // get the session_url from backend
            // We have two url into the backend
            // Based on the successful or unsuccessful url its choose the URL from the backend
            const {session_url} = responseStripe.data
            window.location.replace(session_url);
          } else{
            toast.error(responseStripe.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log("Error inside the catch block of PlaceOrder on form handler");
      toast.error('Failed to place the order');
    }

  }

  return (
    // when ever someone submit the form this function is getting called
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ----  Left Side (form for user all details) ---- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          {/* Here in all the inputs we have passed the onchange, name and value to store the current data of user into the formData */}
          {/* We have passed the required property as well, if user not pass any value, he will not able to place the order  */}
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
      </div>
      {/*---- Right Side (Place order, checkout button, total Amount and all---*/}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* ------- Payment Method Selection ------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            {/* if someone click on the stripe then it will set the value in method varibale */}
            {/* Then we check in if else the vareable value is same then show the css which we want */}
            {/* This is how its works in all three */}
            <div onClick={( )=> setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe'? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            {/* <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay'? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div> */}
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod'? 'bg-green-400' : ''} `}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            {/* When user click on the place order button, All the data will be stored inside the formData and then we can send it to the backend */}
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder