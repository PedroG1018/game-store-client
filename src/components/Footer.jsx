import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import icon from "../../src/img/1up.png";

const Footer = () => {
  return (
    <footer className=" bg-white p-8 mx-auto flex flex-col items-center w-full">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg:white text-center md:justify-between">
        <a href="/">
          <img src={icon} alt="logo-ct" className="w-10" />
        </a>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="/cart"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Shopping Cart
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Orders
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <Typography color="blue-gray" className="text-center font-medium">
        &copy; 2023 1-Up Store
      </Typography>
    </footer>
  );
};

export default Footer;
