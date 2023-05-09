import React from "react";

const Brands = () => {
  return (
    <div className="flex justify-center mt-10 space-x-4">
      <div className="bg-gray-100 p-10 rounded-3xl w-[30em] items-center flex h-[10em] border border-black border-opacity-30 hover:border-opacity-100">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Nintendo.svg/1024px-Nintendo.svg.png"
          alt="nintendo logo"
          className="rounded-3xl items-center"
        />
      </div>
      <div className="bg-gray-100 p-10 rounded-3xl w-[30em] items-center flex h-[10em] border border-black border-opacity-30 hover:border-opacity-100">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/PlayStation_logo_and_wordmark.svg/2560px-PlayStation_logo_and_wordmark.svg.png"
          alt="nintendo logo"
          className="rounded-3xl"
        />
      </div>
      <div className="bg-gray-100 p-10 rounded-3xl w-[30em] items-center flex h-[10em] border border-black border-opacity-30 hover:border-opacity-100">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/XBOX_logo_2012.svg/1280px-XBOX_logo_2012.svg.png"
          alt="nintendo logo"
          className="rounded-3xl"
        />
      </div>
    </div>
  );
};

export default Brands;
