import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      {/* Contact Us Title */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt="Contact Us"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">
            Welcome to LuxeHaven
          </p>
          <p className="text-gray-500">
            286 Wilson St E
            <br />
            Ancaster, ON, CANADA
          </p>
          <p className="text-gray-500">
            Tel: +1 (416) 555-1234
            <br />
            Email: rahulrajput@rr.com
          </p>
          <p className="text-gray-600 font-semibold text-xl">
            Careers at LuxeHaven
          </p>
          <p className="text-gray-500">
            Find Out About Our Teams and Current Job Openings
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
      {/* Newsletter sign-up */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;
