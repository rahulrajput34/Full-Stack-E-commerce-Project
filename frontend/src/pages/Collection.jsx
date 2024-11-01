import { useEffect, useState } from 'react';
import React from 'react'
import { ShopContext } from '../context/ShopContext';
import { useContext } from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';



// for all collection
const Collection = () => {
  // for products
  const { products, search, showSearch } = useContext(ShopContext);
  // for filter options
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  // This below hook is for sorting the product according to price logic
  // default value gonna be relavent
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    // This first condistion if we target the caregory that time it will filter out rest of value
    // If we target the Men catagory then it will filter out women and kids and show Men
    // The else case is if catagory not exits that time add this value to the category
    // If we select on the men It will create an array which stored value men
    // If we select all of three categories then it will create an array which consists three elements
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else{
      setCategory(prev => [...prev, e.target.value])
    }
  };

  // This is for SubCategory
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else{
      setSubCategory(prev => [...prev, e.target.value])
    }
  };

  // This is for apply filter
  // Here we are stroing the values inside filterProducts
  // Then we use apply function to implement this logic and when there is any change in catrgory or subcategory that time it will implemenets the changes in filterProducts
  // If there is no change inside the any of above it gonna display all the products from product Copy
  // Then we display on the website using map below
  const applyFilter = () => {
    let productsCopy = products.slice();
    // If we search anything on the search bar it will the what we are searching
    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }

  // for sorting according to price
  const sortPrice = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        // if nothing there just display random
        applyFilter();
        break;
    }
  }
 
  // if any of these from category, subCategory updated we want to call the function
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  // For executing the function sortPrice whenn we have changed sortType
  useEffect(() => {
    sortPrice();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t' >
      {/* Filter Options */}
      <div className='min-w-60'>
        {/* For small screen only because we set it like when its small then and only then it will show */}
        {/* if filter is clicked then show filter options */}
        {/* if its true it gonna make it false when we click */}
        {/* if its false it gonna make it true when we click */}
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex item-center cursor-pointer gap-2'>FILTERS</p>
        {/* Show for only smaller screen sizes */}
        <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'}  onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'}  onChange={toggleCategory}/> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>
        {/* subCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* right side of collection */}
      <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1={'ALL'} text2={'COLLECTIONS'}/>
            {/* Product Sort */}
            {/* When the value changes it will store the value in sortType*/}
            <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
          {/* Map Products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>

            {
              filterProducts.map((item, index) => 
                (
                 <ProductItem key={index} id={item._id} image={item.images} name={item.name} price={item.price}/>
                )
              )
            }
          </div>
      </div> 
    </div>
  )
}

export default Collection