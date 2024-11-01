import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom';

function SearchBar() {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    // its simple means that showSearch is true then show the search bar else dont show (show null)

    // So the search bar is diplayin on the all the path
    // How can we change it?
    // For this we use location hook and write below logic for doing this
    const [visible, setVisible] = useState(false);
    // useLocation hook is used to get curreent location array of the path
    const location = useLocation();

    useEffect(() => {
        // console.log(location.pathname);
        if(location.pathname.includes('collection')){
            setVisible(true);
        } else{
            setVisible(false);
        }
    }, [location]);


// If the both state below is true then and only then display the search bar
  return showSearch && visible ?  (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            {/* for current value of search we use value and for onChange we use onChange */}
            <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search'/>
            <img className='w-4' src={assets.search_icon} alt="" />
        </div>    
        {/* for closing the search bar we use onClick and we set the showSearch to false */}
        {/* it means the serach gonna be removed if we click on cross icon */}
        <img onClick={() => setShowSearch(false)}  className= 'inline w-3 cursor-pointer' src={assets.cross_icon} alt=""/>
    </div>
  ) : null
}

export default SearchBar