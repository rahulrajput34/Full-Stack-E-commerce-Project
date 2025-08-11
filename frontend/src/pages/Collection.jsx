import React, { useEffect, useState, useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const CATEGORIES = ["Men", "Women", "Kids"];
const TYPES = ["Topwear", "Bottomwear", "Winterwear"];

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    const val = e.target.value;
    setCategory((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    );
  };

  const toggleSubCategory = (e) => {
    const val = e.target.value;
    setSubCategory((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    );
  };

  const removeCategory = (val) =>
    setCategory((prev) => prev.filter((x) => x !== val));
  const removeSubCategory = (val) =>
    setSubCategory((prev) => prev.filter((x) => x !== val));

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType("relavent");
  };

  const applyFilter = () => {
    let copy = products.slice();

    if (showSearch && search) {
      const q = search.toLowerCase();
      copy = copy.filter((item) => item.name.toLowerCase().includes(q));
    }
    if (category.length > 0) {
      copy = copy.filter((item) => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      copy = copy.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(copy);
  };

  const sortPrice = () => {
    let copy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(copy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(copy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortPrice();
  }, [sortType]);

  const filtersApplied = useMemo(
    () =>
      category.length > 0 || subCategory.length > 0 || (showSearch && !!search),
    [category, subCategory, showSearch, search]
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10">
        {/* Sidebar */}
        <aside className="sm:w-64 shrink-0">
          {/* Mobile sticky filter bar */}
          <div className="sm:hidden sticky top-16 z-30 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-b border-gray-100">
            <button
              onClick={() => setShowFilter((v) => !v)}
              className="w-full inline-flex items-center justify-between px-4 py-3 text-left text-sm font-semibold text-gray-900"
              aria-expanded={showFilter}
              aria-controls="filters-panel"
            >
              <span>Filters</span>
              <img
                className={`h-3 transition-transform ${
                  showFilter ? "rotate-90" : ""
                }`}
                src={assets.dropdown_icon}
                alt=""
              />
            </button>
          </div>

          {/* Filter card (sticky on desktop) */}
          <div
            id="filters-panel"
            className={`mt-3 sm:mt-0 rounded-2xl border border-gray-200 bg-white shadow-sm sm:sticky sm:top-20 ${
              showFilter ? "block" : "hidden sm:block"
            }`}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <p className="text-sm font-semibold text-gray-900 tracking-wide">
                FILTERS
              </p>
              <button
                onClick={clearFilters}
                className="text-xs font-medium text-gray-600 hover:text-gray-900"
              >
                Clear all
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {/* Categories */}
              <div className="px-5 py-4">
                <p className="mb-3 text-sm font-medium text-gray-900">
                  Categories
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  {CATEGORIES.map((c) => (
                    <label key={c} className="flex items-center gap-2">
                      <input
                        className="w-4 h-4 accent-gray-900"
                        type="checkbox"
                        value={c}
                        checked={category.includes(c)}
                        onChange={toggleCategory}
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Types */}
              <div className="px-5 py-4">
                <p className="mb-3 text-sm font-medium text-gray-900">Type</p>
                <div className="space-y-2 text-sm text-gray-700">
                  {TYPES.map((t) => (
                    <label key={t} className="flex items-center gap-2">
                      <input
                        className="w-4 h-4 accent-gray-900"
                        type="checkbox"
                        value={t}
                        checked={subCategory.includes(t)}
                        onChange={toggleSubCategory}
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <section className="flex-1">
          {/* Header: title + sort */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div className="text-base sm:text-2xl">
              <Title text1="ALL" text2="COLLECTIONS" />
            </div>

            <div className="flex items-center gap-3">
              <p className="hidden md:block text-sm text-gray-500">
                {filterProducts.length} items
              </p>
              <div className="relative">
                <label htmlFor="sort" className="sr-only">
                  Sort products
                </label>
                <select
                  id="sort"
                  onChange={(e) => setSortType(e.target.value)}
                  value={sortType}
                  className="appearance-none rounded-xl border border-gray-300 bg-white pl-3 pr-9 py-2 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20"
                >
                  <option value="relavent">Sort by: Relevant</option>
                  <option value="low-high">Sort by: Low to High</option>
                  <option value="high-low">Sort by: High to Low</option>
                </select>
                <img
                  src={assets.dropdown_icon}
                  alt=""
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3"
                />
              </div>
            </div>
          </div>

          {/* Active filters */}
          {category.length || subCategory.length || (showSearch && search) ? (
            <div className="mb-5 flex flex-wrap gap-2">
              {category.map((c) => (
                <button
                  key={`cat-${c}`}
                  onClick={() => removeCategory(c)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-100"
                  aria-label={`Remove category ${c}`}
                >
                  {c}
                  <span className="text-gray-500">×</span>
                </button>
              ))}
              {subCategory.map((s) => (
                <button
                  key={`sub-${s}`}
                  onClick={() => removeSubCategory(s)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-100"
                  aria-label={`Remove type ${s}`}
                >
                  {s}
                  <span className="text-gray-500">×</span>
                </button>
              ))}
              {showSearch && !!search && (
                <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600">
                  Search:{" "}
                  <span className="font-medium text-gray-900">{search}</span>
                </span>
              )}
            </div>
          ) : null}

          {/* Products grid / Empty state */}
          {filterProducts.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {filterProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item._id}
                  image={item.images}
                  name={item.name}
                  price={item.price}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <div className="mx-auto h-10 w-10 rounded-full ring-1 ring-gray-200 flex items-center justify-center mb-3">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                No results found
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Try adjusting filters or clearing them to see more items.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold text-white bg-gray-900 hover:bg-gray-800 transition"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Collection;
