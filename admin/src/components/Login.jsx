import axios from 'axios';
import { useState } from 'react'
import React from 'react'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

function Login({setToken}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onSubmitHandler = async (e) => {
        try {
            // prevent from unneccessary reload of webpage
            e.preventDefault(); 
            // send the data{email and password} to backend
            // post is for post req , then we passed the where we want to  send the data
            // Then passed what we want to pass
            const response = await axios.post(backendUrl+ '/api/user/admin', {email, password})
            // we have passed the original id and password and it's working fine
            
            // from the below login if the token is true then we pass it to the app.jsx
            // In app.jsx we have logic of if the token it present then show the login page
            if(response.data.success){
                setToken(response.data.token);
            } else{
                // display error notification using toast
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    {/* What ever user gave it will be stored in email state variable */}
                    <input onChange={(e) => setEmail(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required autocomplete="current-password"/>
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    {/* What ever user gave it will be stored in password state variable */}
                    <input onChange={(e) => setPassword(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required/>
                </div>
                <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login