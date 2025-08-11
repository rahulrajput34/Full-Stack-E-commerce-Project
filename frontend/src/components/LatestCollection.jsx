import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

function LatestCollection() {
  const { products = [] } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className="py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <Title text1="LATEST" text2="COLLECTIONS" />
          <p className="mx-auto max-w-2xl text-xs sm:text-sm md:text-base text-gray-600">
            Fresh arrivals curated for quality and style.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {latestProducts.length ? (
            latestProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                image={item.images}
                name={item.name}
                price={item.price}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              No products yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LatestCollection;
