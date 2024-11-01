import { useEffect, useState } from 'react';
import React from 'react'
import { ShopContext } from '../context/ShopContext';
import { useContext } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';


function BestSeller() {
    // get all data context API
    const { products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        // Where ever Bestseller is true it sets oveer here
        const bestProduct = products.filter((item) => (item.bestseller))
        // console.log(bestProduct); // fine
        
        // to store best 4 products only
        setBestSeller(bestProduct.slice(0, 5))
    }, [products]);

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam dolorum error aspernatur molestiae debitis sed cum eius reiciendis reprehenderit.
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
              bestSeller.map((item, index) => 
                (
                 <ProductItem key={index} id={item._id} image={item.images} name={item.name} price={item.price}/>
                )
              )
            }
        </div>
    </div>
  )
}

export default BestSeller