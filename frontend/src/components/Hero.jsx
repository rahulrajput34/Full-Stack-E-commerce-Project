import React from "react";
import final from "../assets/final.png";

function Hero() {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Left Section: Text and Call-to-Action */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className="prata-regular text-4xl sm:py-3 lg:text-5x1 leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/* Right Section: Hero Image */}
      <img className="w-full sm:w-1/2" src={final} alt="Hero Visual" />
    </div>
  );
}

export default Hero;
