import React from 'react';

const NoData = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#f0f4f8] p-6 rounded-lg shadow-lg h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-16 h-16 text-gray-400 mb-4"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9 9l6 6M15 9l-6 6" />
      </svg>

      <div className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
        No Data Available
      </div>
      <p className="text-sm md:text-base text-gray-600 mt-2 text-center">
        There seems to be no data available at the moment. Please try again
        later.
      </p>
    </div>
  );
};

export default NoData;
