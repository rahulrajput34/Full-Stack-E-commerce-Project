import React, { useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const Login = () => {
  // by default the login page will be visibale
  const [currentState, setCurrentState] = useState("Login");
  // to get the token from the context
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // we gave preventdefault for when we submit do not reload the page
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        // if current stage is Sing Up
        // means user gonna pass the data for sign up
        // then we pass the data which is name, email, password to the backend at this given URL
        // it will be checked by server and we gonna get the reponse
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        // console.log(response.data); // working fine we got the object which contain token 
        if(response.data.success){
          // set the token which is of current user
          setToken(response.data.token);
          // store the token in local storage so that we do not need to give credentials again and again
          localStorage.setItem('token', response.data.token);
        } else{
          toast.error(response.data.message);
        }
      } else {
        // if the state is not sign up means the state is login
        // we pass the data to the backend whihc is email and password
        // it will be checked by server and we gonna get the reponse
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        // console.log(response.data);  // working fine 
        if(response.data.success){
          // if true then set the value of token which we got from the user as a reponse
          // store it into the storage so that user do need to pass credential again and again
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else{
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(`${error} Error Inside onSubmitHandler in Login.jsx `);
    }
  }

  // Logic for when we click on the Login and the token is stored into the storage, Then we redirect the user on the home page
  // now we click on the login it automatically logied in
  // But when we click on the referece then we are able to see login page
  // for that we write the login into ShopContext
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-8'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {/* required simple means it is compulsory to fill the form */}
      {/* check if current state is login then dont show name field */}
      {/* set the value of name, email and password to which we got from the user from onchange handler */}
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input onChange={(e) => setEmail(e.target.value)} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password</p>
        {/* if current state is login then show login here */}
        {/* else show create account */}
        {
          currentState === "Login"
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign up'}</button>
    </form>
  )
}
export default Login