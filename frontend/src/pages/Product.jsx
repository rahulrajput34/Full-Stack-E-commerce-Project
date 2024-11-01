import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  // get the id of the product which we clicked
  const { productId } = useParams();
  //console.log(productId);
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  // set the prodcut data accoring to id clicked
  const fetchProductData = async () => {
    products.map((item) => {
      // check for get perticuler product info from all the listed products
      if (item._id === productId) {
        setProductData(item); // to store into productData
        setImage(item.images[0]);
        // console.log(item);
        return null;
      }
    });
  };

  // Whenever the product id changes it will fetch the product data means call the function named fetchProductData
  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              // to display all the images of the one product on left side
              productData.images.map((item, index) => {
                return (
                  // this onclick is setting the side image into main image
                  <img
                    onClick={() => setImage(item)}
                    className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                    src={item}
                    key={index}
                    alt=""
                  />
                );
              })
            }
          </div>
          <div className="w-full sm:w-[80%]">
            {/* we gave image over here becasue this is for the first image of the item */}
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* ___________ Product Information ___________ */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            {/* To display the sizes of the product */}
            <div className="flex gap-2">
              {
                // item is diff sized we gonna get
                // means from project name we getting perticuler data from using JSON
                productData.sizes.map((item, index) => {
                  return (
                    // on the onclick we set value of size which one is clicked
                    // Now if anyone is clicked we compare to item to size
                    // if they match then highlight
                    <button
                      onClick={() => setSize(item)}
                      className={`border py-2 px-4 bg-gray-100 ${
                        item === size ? "border-orange-500" : ""
                      }`}
                      key={index}
                    >
                      {item}
                    </button>
                  );
                })
              }
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Rasy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* disscription and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
            quasi recusandae incidunt nihil fuga culpa voluptatibus voluptatum
            animi consectetur corrupti, veniam suscipit nulla quidem cum.
            Cupiditate numquam accusantium saepe incidunt delectus, quae dicta
            enim quo autem possimus amet quod ex tempora dolor, corrupti
            deleniti iure dolores provident maiores, temporibus omnis!
            Repellendus.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
            repudiandae quis blanditiis culpa, beatae asperiores aut numquam
            sunt quibusdam hic provident commodi nesciunt quaerat earum eligendi
            iusto obcaecati doloribus.
          </p>
        </div>
      </div>
      {/* display related products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
};

export default Product;
