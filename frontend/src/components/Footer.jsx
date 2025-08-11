import React from "react";
import logoo from "../assets/logoo.png";

function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Delivery", href: "/delivery" },
    { label: "Privacy policy", href: "/privacy" },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-6">
            <img
              src={logoo}
              alt="LuxeHaven logo"
              className="w-36 h-auto mb-5"
            />
            <p className="text-gray-600 leading-relaxed max-w-xl">
              LuxeHaven curates elevated essentials that blend form and
              function. Thoughtful materials. Clean lines. Everyday wearability.
            </p>
          </div>

          {/* Company */}
          <nav aria-label="Company" className="md:col-span-3">
            <p className="text-[11px] tracking-wider font-medium text-gray-900 uppercase">
              Company
            </p>
            <ul className="mt-4 space-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-gray-600 hover:text-gray-900 transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="text-[11px] tracking-wider font-medium text-gray-900 uppercase">
              Get in touch
            </p>
            <address className="not-italic mt-4 space-y-2 text-gray-600">
              <p>
                <a
                  href="tel:+13658331736"
                  className="hover:text-gray-900 transition"
                >
                  +1 (365) 833-1736
                </a>
              </p>
              <p>
                <a
                  href="mailto:rajputrahul3424@gmail.com"
                  className="hover:text-gray-900 transition"
                >
                  rajputrahul3424@gmail.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-gray-500">
              © {year} RR-Clothing — All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs sm:text-sm">
              <a
                href="/privacy"
                className="text-gray-500 hover:text-gray-900 transition"
              >
                Privacy
              </a>
              <a
                href="/delivery"
                className="text-gray-500 hover:text-gray-900 transition"
              >
                Delivery
              </a>
              <a
                href="/"
                className="text-gray-500 hover:text-gray-900 transition"
              >
                Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
