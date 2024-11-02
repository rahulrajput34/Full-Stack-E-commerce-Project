import React from "react";
import logoo from "../assets/logoo.png";

function Footer() {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={logoo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            "Welcome to LuxeHaven, where luxury and style converge to create a
            unique sanctuary for fashion enthusiasts. Discover curated
            collections that embody elegance and comfort, empowering you to
            express your individuality and make a statement with every outfit."
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1 (365) 833-1736</li>
            <li>rajputrahul3424@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ RR-Clothing.com - ALL Right Reserverd
        </p>
      </div>
    </div>
  );
}

export default Footer;
