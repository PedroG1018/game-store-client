import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import icon from "../../src/img/1up.png";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-800 p-8 mt-10">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between text-white">
        <a href="/">
          <img src={icon} alt="logo-ct" className="w-10" />
        </a>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-white focus:text-white text-gray-200"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-white focus:text-white text-gray-200"
            >
              Shopping Cart
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-white focus:text-white text-gray-200"
            >
              Orders
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-white focus:text-white text-gray-200"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="white" className="text-center font-normal">
        &copy; 2023 Material Tailwind
      </Typography>
    </footer>
  );
};

export default Footer;
