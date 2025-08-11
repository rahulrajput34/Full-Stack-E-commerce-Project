import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

function BestSeller() {
  const { products = [] } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const filtered = products.filter((item) => item.bestseller);
    setBestSeller(filtered.slice(0, 5));
  }, [products]);

  return (
    <section className="py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <Title text1="BEST" text2="SELLERS" />
          <p className="mx-auto max-w-2xl text-xs sm:text-sm md:text-base text-gray-600">
            Customer favorites that fly off the shelves.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {bestSeller.length ? (
            bestSeller.map((item, index) => (
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
              No bestsellers to show right now.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BestSeller;
