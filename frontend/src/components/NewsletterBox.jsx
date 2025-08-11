import React from "react";

function NewsletterBox() {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <section className="py-10 sm:py-12 lg:py-16 text-center">
      <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        Subscribe now & unlock 20% off!
      </h3>
      <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
        Stay updated with new drops, exclusive deals, and early access.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="mt-6 w-full sm:w-[560px] mx-auto flex items-stretch overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-gray-900"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>

        <div className="hidden sm:flex items-center pl-4 pr-2">
          {/* Mail icon */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M3 7l9 6 9-6" />
            <rect x="3" y="5" width="18" height="14" rx="2" />
          </svg>
        </div>

        <input
          id="newsletter-email"
          className="w-full px-4 py-3 text-sm outline-none placeholder:text-gray-400"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          required
        />

        <button
          type="submit"
          className="px-5 sm:px-6 py-3 text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-900 transition"
        >
          Subscribe
        </button>
      </form>

      <p className="mt-3 text-xs text-gray-400">
        No spam. Unsubscribe anytime.
      </p>
    </section>
  );
}

export default NewsletterBox;
