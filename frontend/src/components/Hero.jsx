import React from "react";
import final from "../assets/final.png";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 text-gray-700">
              <span className="h-[2px] w-10 bg-gray-800" />
              <span className="text-xs sm:text-sm font-medium tracking-wide">
                OUR BESTSELLERS
              </span>
            </div>

            <h1 className="prata-regular mt-4 sm:mt-6 text-4xl sm:text-5xl lg:text-6xl leading-tight text-gray-900">
              Latest Arrivals
            </h1>

            <p className="mt-4 sm:mt-6 max-w-xl text-gray-600 text-sm sm:text-base">
              Step into the season with our newest drops—premium quality,
              timeless design, and everyday comfort.
            </p>

            <div className="mt-8">
              <a
                href="/collection"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 active:bg-gray-900 transition shadow-sm"
              >
                Shop Now
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-gray-200 shadow-sm">
              <img
                src={final}
                alt="Featured products from the latest collection"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
