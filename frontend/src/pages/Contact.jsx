import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <section className="pt-10 sm:pt-12 lg:pt-16 text-center">
        <Title text1="CONTACT" text2="US" />
      </section>

      {/* Content */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Image */}
        <div className="relative rounded-3xl overflow-hidden ring-1 ring-gray-200 shadow-sm">
          <img
            className="w-full h-[320px] sm:h-[380px] md:h-[460px] object-cover"
            src={assets.contact_img}
            alt="Contact LuxeHaven"
          />
        </div>

        {/* Cards */}
        <div className="space-y-6">
          {/* Address & contact */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <p className="text-sm tracking-wider uppercase text-gray-900 font-semibold">
              Head Office
            </p>

            <div className="mt-4 space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 21s-7-5.4-7-11a7 7 0 1 1 14 0c0 5.6-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <p>
                  286 Wilson St E
                  <br />
                  Ancaster, ON, CANADA
                </p>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M22 16.5v2a2 2 0 0 1-2.18 2c-3.35-.37-7.36-2.78-10.64-6.06S3.87 6.53 3.5 3.18A2 2 0 0 1 5.5 1h2a2 2 0 0 1 2 1.72c.07.6.18 1.18.32 1.74a2 2 0 0 1-.45 1.9l-1 1.1a16 16 0 0 0 6.9 6.9l1.1-1a2 2 0 0 1 1.9-.45c.56.14 1.14.25 1.74.32A2 2 0 0 1 22 16.5z" />
                </svg>
                <a
                  href="tel:+13658331736"
                  className="hover:text-gray-900 transition"
                >
                  +1 (365) 833-1736
                </a>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                <a
                  href="mailto:rajputrahul3424@gmaill.com"
                  className="hover:text-gray-900 transition"
                >
                  rajputrahul3424@gmaill.com
                </a>
              </div>
            </div>
          </div>

          {/* Careers */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <p className="text-sm tracking-wider uppercase text-gray-900 font-semibold">
              Careers at LuxeHaven
            </p>
            <p className="mt-2 text-gray-600">
              Find out about our teams and current job openings.
            </p>
            <a
              href="/careers"
              className="mt-4 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 transition shadow-sm"
            >
              Explore Jobs
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
      </section>

      {/* Newsletter */}
      <section className="mt-16 sm:mt-20 mb-10">
        <NewsletterBox />
      </section>
    </main>
  );
};

export default Contact;
