import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-blue-500">
      <img
        src="https://store-ymgqt.mybigcommerce.com/content/images/footer-logo.jpg"
        alt="logo"
        className="mx-auto"
      />
      <div className="text-white grid grid-cols-2 justify-items-center pt-4 pb-10">
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
  );
};

export default Footer;
