import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Login from './pages/Login'
import Orders from './pages/Orders'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'

function App() {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      {/* This Navbar will be visible in all pages because we give above of the routes */}
      <Navbar/>
      <SearchBar/>
        <Routes>
          <Route path='/' element= {<Home/>} />
          <Route path='/collection' element={<Collection/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/product/:productId' element={<Product/>} />
          <Route path='cart' element={<Cart/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/place-order' element={<PlaceOrder/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/verify' element={<Verify/>} />

        </Routes>
        {/* This Footer will be visible in all pages because we give below of the routes */}
        <Footer/>
    </div>

  )
}

export default App