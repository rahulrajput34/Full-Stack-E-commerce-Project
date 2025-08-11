import React from "react";

function Title({ text1, text2 }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="hidden sm:inline-block h-[2px] w-12 bg-gray-200 rounded-full" />
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
        <span className="text-gray-900">{text1}</span>{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500">
          {text2}
        </span>
      </h2>
      <span className="hidden sm:inline-block h-[2px] w-12 bg-gray-200 rounded-full" />
    </div>
  );
}

export default Title;
