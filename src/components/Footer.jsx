import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white">
      <div className="bg-blue-900 text-center py-4 m-auto">
        <h1 className="pb-3 text-2xl font-semibold">Contact</h1>
        <div className="items-center space-x-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-lg"
          />
          <button type="button" className="bg-gray-500 p-3">
            <AiOutlineSend />
          </button>
        </div>
      </div>
      <hr />
      <div className="bg-blue-700 py-2">
        <div className="grid grid-cols-2 justify-items-center py-10">
          <div>
            <h1 className="font-bold text-xl border-b-4 border-yellow-400 mb-2 pb-2">
              1-UP STORE
            </h1>
            <ul>
              <li>About Us</li>
              <li>Sell Video Games</li>
              <li>Repair Center</li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold text-xl border-b-4 border-yellow-400 mb-2 pb-2">
              ACCOUNT
            </h1>
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
