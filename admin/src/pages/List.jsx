import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify';


// Whatever items we have added using add into admin panel
// we gonna List it over here
function List({token}) {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      // When we want to get values from the server that time we use get
      // also we need to give route from we want to add
      const response = await axios.get(`${backendUrl}/api/product/list`);
      // console.log(response.data); // working fine

      // add into list if response is ture and we got the values form backend
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  const removeProduct = async (id) => {
    try {
      // So we give req to the border at given url
      // we pass id which is given by clinet by clicking delete
      // Then reponse will goes to given perticuler id
      // We also passed the token to check auth of admin
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, {headers: {token}})
      if (response.data.success) {
        toast.success(response.data.message)
        // Our product will be remove so we need to call the function again to diplay new list
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList();
  }, [])
  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* -----  List table Title ---- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Remove</b>
        </div>
        {/* -----  Product List ---- */}
        {
          list.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
              {/* got from the backend from axios*/}
              <img className='w-12' src={item.images[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List