import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="pt-10 sm:pt-12 lg:pt-16 text-center">
        <Title text1="ABOUT" text2="US" />
      </section>

      {/* Intro */}
      <section className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative rounded-3xl overflow-hidden ring-1 ring-gray-200 shadow-sm">
          <img
            src={assets.about_img}
            alt="LuxeHaven studio and curated apparel"
            className="w-full h-[320px] sm:h-[380px] md:h-[460px] object-cover"
          />
        </div>

        <div className="flex flex-col gap-5 md:gap-6 text-gray-600">
          <p>
            At <span className="font-semibold text-gray-900">LuxeHaven</span>,
            we curate handpicked collections that blend elegance, comfort, and
            individuality. Our team obsesses over detail and quality so you can
            feel confident in every moment.
          </p>
          <p>
            From timeless staples to contemporary drops, every piece is vetted
            for build, fit, and finish—crafted to last and designed to be worn.
          </p>

          <div className="mt-2">
            <p className="text-sm tracking-wider uppercase text-gray-900 font-semibold">
              Our Mission
            </p>
            <p className="mt-2">
              We aim to empower personal expression with accessible luxury—
              versatile pieces that reflect your journey while honoring
              craftsmanship and sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mt-16 sm:mt-20">
        <div className="text-center">
          <Title text1="WHY" text2="CHOOSE US" />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-sm">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow transition">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-gray-200 bg-gray-50 mb-4">
              {/* Shield / quality icon */}
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              Quality Assurance
            </h3>
            <p className="mt-2 text-gray-600">
              Every item is selected against strict standards—from fabric to
              finish—so your wardrobe looks great and lasts.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow transition">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-gray-200 bg-gray-50 mb-4">
              {/* Truck / delivery icon */}
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M3 7h11v8H3z" />
                <path d="M14 10h4l3 3v2h-7z" />
                <circle cx="7.5" cy="17.5" r="1.5" />
                <circle cx="17.5" cy="17.5" r="1.5" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              Convenience
            </h3>
            <p className="mt-2 text-gray-600">
              A seamless online experience—from discovery to doorstep—so you can
              shop quickly and confidently.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow transition">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-gray-200 bg-gray-50 mb-4">
              {/* Headset / support icon */}
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 12a8 8 0 0116 0v6a2 2 0 01-2 2h-4" />
                <path d="M4 14h3v4H4zM17 14h3v4h-3z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              Exceptional Support
            </h3>
            <p className="mt-2 text-gray-600">
              Friendly, responsive help for sizing, shipping, and styling—so
              every step feels effortless.
            </p>
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

export default About;
