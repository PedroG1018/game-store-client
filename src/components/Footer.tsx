import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white">
      <div className="bg-blue-700 text-center py-4 m-auto space-x-2 items-center">
        <h1 className="pb-3 text-2xl font-semibold">Contact</h1>
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 rounded-lg"
        />
        <button type="submit" className="bg-gray-500 p-3 items-center my-auto">
          <FaSearch />
        </button>
      </div>
      <hr />
      <div className="bg-blue-500 py-2">
        <img
          src="https://store-ymgqt.mybigcommerce.com/content/images/footer-logo.jpg"
          alt="logo"
          className="mx-auto"
        />
        <div className="grid grid-cols-2 justify-items-center pb-10">
          <div className="cl-white-200">
            <p className="font-sans font-bold text-xl">1-UP STORE</p>
            <ul>
              <li>About Us</li>
              <li>Sell Video Games</li>
              <li>Repair Center</li>
            </ul>
          </div>
          <div className="">
            <p className="font-sans font-bold text-xl">ACCOUNT</p>
            <ul>
              <li>
                <Link to="/">My Account</Link>
              </li>
              <li>Shopping Cart</li>
              <li>Accessibility</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
