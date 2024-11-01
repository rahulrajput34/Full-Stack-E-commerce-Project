import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

function LatestCollection() {
    // getting products values from context
    const { products} = useContext(ShopContext);
    const [lastestProducts, setLastestProducts] = useState([]);

    // to get 10 lastest products
    useEffect(() => {
        setLastestProducts(products.slice(0, 10));
    }, [products]);
    
return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia adipisci unde nostrum quos, ipsa error distinctio? Labore ipsa.</p>
        </div>
        {/* Rendering latest products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {/* Mapping through products */}
            {/* item and index are just variable names */}
            {/* item is each product and index is index of each product */}
            {/* map has item and index as parameters */}
            {
              lastestProducts.map((item, index) => 
                (
                 <ProductItem key={index} id={item._id} image={item.images} name={item.name} price={item.price}/>
                )
              )
            }
        </div>
    </div>
  )
}

export default LatestCollection