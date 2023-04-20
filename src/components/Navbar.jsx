import React, { Fragment, Component } from "react";
import icon from "../../src/img/1up.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="grid grid-rows-2 m-auto">
      <nav className="grid grid-cols-3 bg-blue-700 p-4 text-white">
        <div className="space-x-2 m-auto">
          <a
            href="/"
            className="decoration-yellow-400 decoration-4 hover:underline hover:underline-offset-8"
          >
            Contact
          </a>
          <a
            href="/"
            className="decoration-yellow-400 decoration-4 hover:underline hover:underline-offset-8"
          >
            About Us
          </a>
        </div>
        <div className="mx-auto">
          <a href="/">
            <img src={icon} alt="logo" className="w-10" />
          </a>
        </div>
        <div className="space-x-2 m-auto">
          <a href="/login" className="hover:underline">
            Login
          </a>
          <a href="/account" className="hover:underline">
            Account
          </a>
          <a href="/" className="hover:underline">
            Cart
          </a>
        </div>
      </nav>
      <nav className="flex bg-blue-900">
        <div className=" text-white flex my-auto ml-10 justify-start">
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
        <div className="my-auto ml-auto mr-10 space-x-2 justify-end">
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