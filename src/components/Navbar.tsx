import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="grid grid-rows-2 m-auto">
      <nav className="grid grid-cols-3 bg-blue-500 p-4 text-white">
        <div className="space-x-2 m-auto">
          <a href="/" className="hover:underline">
            Contact
          </a>
          <a href="/" className="hover:underline">
            About Us
          </a>
        </div>
        <div className="mx-auto">
          <a href="/">
            <img
              src="https://store-ymgqt.mybigcommerce.com/content/images/footer-logo.jpg"
              alt="logo"
            />
          </a>
        </div>
        <div className="space-x-2 m-auto">
          <a href="/" className="hover:underline">
            Login
          </a>
          <a href="/" className="hover:underline">
            Account
          </a>
          <a href="/" className="hover:underline">
            Cart
          </a>
        </div>
      </nav>
      <nav className="grid grid-cols-2 bg-blue-700">
        <div className="space-x-3 text-white flex items-center m-auto">
          <div className="p-4 hover:cursor-pointer hover:border-b-4">
            <a href="/">Nintendo</a>
          </div>
          <div className="p-4 hover:cursor-pointer hover:border-b-4">
            <a href="/">Sega</a>
          </div>
          <div className="p-4 hover:cursor-pointer hover:border-b-4">
            <a href="/">Playstation</a>
          </div>
          <div className="p-4 hover:cursor-pointer hover:border-b-4 ">
            <a href="/">Xbox</a>
          </div>
        </div>
        <div className="m-auto space-x-2">
          <input
            type="text"
            placeholder="Search the store"
            className="p-2 rounded-lg"
          ></input>
          <button type="submit">
            <img src="" alt="search icon" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
