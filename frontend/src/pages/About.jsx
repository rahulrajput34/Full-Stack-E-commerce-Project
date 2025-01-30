import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At LuxeHaven, we strive to redefine fashion by bringing you
            handpicked collections that blend elegance, comfort, and
            individuality. Our team is dedicated to curating premium styles that
            resonate with your personality and help you feel confident and
            unique in every moment.
          </p>
          <p>
            From timeless classics to contemporary trends, we ensure every piece
            we offer meets the highest standards of quality and craftsmanship.
            Our passion lies in delivering an exceptional experience for every
            customer, creating a community where style knows no boundaries.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            We aim to inspire and empower you to express yourself through
            fashion that feels authentic and personal. Our mission is to make
            luxury accessible, offering versatile pieces that reflect your
            unique journey while maintaining a commitment to excellence and
            sustainability.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance: </b>
          <p className="text-gray-600">
            Every item in our collection is carefully selected to meet our
            stringent quality standards. From fabric to fit, we pay attention to
            the smallest details, ensuring that you receive products that not
            only look stunning but also stand the test of time.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            We make shopping easy and enjoyable with a seamless online
            experience. Explore our carefully curated collections, place your
            order, and have your favorite styles delivered straight to your
            door. Your comfort and convenience are our top priorities.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            At LuxeHaven, we pride ourselves on our dedication to customer
            satisfaction. Our friendly and responsive support team is always
            ready to assist you, whether you have questions about sizing,
            shipping, or styling advice. We're here to ensure that every step of
            your journey is effortless and enjoyable.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
