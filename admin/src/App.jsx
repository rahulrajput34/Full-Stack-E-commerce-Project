import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Got the backend Url from give same Port as our backend have in our this admin env file
// Then do it like below to get it and export it to use elseWhere in our admin (any component)
export const backendUrl = import.meta.env.VITE_BACKEND_URL
// console.log(backendUrl);

export const currency = '$'

function App() {
  // get setToken from the login component
  // if token available then take the token as default value else take '' as default value
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'): '');
  console.log(token);
  console.log("Hello");
  
  
  // But when we login into the webpage and next time we want to login we need to give password and id again so that we can store into the local storage
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token])

  // the below code is for checking if the token is empty then first give login page and if it has a value then show the second condtion
  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* This is how we setUp react-toastify */}
      <ToastContainer />
      {/* get setToken from the login component */}
      {token === ''
        ? <Login setToken={setToken} />
        :
        <>
          {/* We have Navbar and sidebar over here for giving to the all the pages */}
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <SideBar />
            <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base'>
              <Routes>
                {/* Here we are defining the routes for the pages */}
                {/* means if we want to do below operations we need to pass the token */}
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/orders" element={<Orders token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App