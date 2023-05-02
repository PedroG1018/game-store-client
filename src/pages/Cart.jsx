import React, { Fragment, useState } from "react";
import { Button, Typography, Select, Option } from "@material-tailwind/react";

const Cart = () => {
  return (
    <div className="flex flex-col mx-auto max-w-screen-lg w-full justify-center my-10">
      <Typography variant="h3" className="text-center mb-8">
        Your Cart
      </Typography>
      <div className="md:w-[36em] w-[30em] justify-center mx-auto">
        <hr />
        <div className="flex justify-between my-6">
          <div className="flex space-x-2">
            <img
              src="https://tailwindui.com/img/ecommerce-images/checkout-page-03-product-04.jpg"
              alt="shirt"
              className="w-[140px]"
            />
            <div>
              <Typography>Hey</Typography>
              <Typography>Hey</Typography>
              <Typography>Hey</Typography>

              <div className="flex space-x-2 mt-4">
                <select
                  label="Qty"
                  className="w-[4em] h-[2em] border border-gray-400 rounded-lg"
                >
                  <option className="">1</option>
                  <option selected="selected">2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <Typography
                  className="text-red-500 font-medium mt-2 cursor-pointer hover:font-semibold my-auto"
                  onClick={() => alert("hey")}
                >
                  Remove
                </Typography>
              </div>
            </div>
          </div>
          <Typography>$hey</Typography>
        </div>
        <hr />
        <hr />
        <div className="flex justify-between my-6">
          <div className="flex space-x-2">
            <img
              src="https://tailwindui.com/img/ecommerce-images/checkout-page-03-product-04.jpg"
              alt="shirt"
              className="w-[140px]"
            />
            <div>
              <Typography>Hey</Typography>
              <Typography>Hey</Typography>
              <Typography>Hey</Typography>

              <div className="flex space-x-2 mt-4">
                <select
                  label="Qty"
                  className="w-[4em] h-[2em] border border-gray-400 rounded-lg"
                >
                  <option className="">1</option>
                  <option selected="selected">2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <Typography
                  className="text-red-500 font-medium mt-2 cursor-pointer hover:font-semibold my-auto"
                  onClick={() => alert("hey")}
                >
                  Remove
                </Typography>
              </div>
            </div>
          </div>
          <Typography>hey</Typography>
        </div>
        <hr />
      </div>
      <div className="md:w-[36em] w-[30em] justify-center items-center mx-auto mt-6">
        <div className="flex justify-between mb-6">
          <Typography className="font-semibold">Subtotal</Typography>
          <Typography className="font-semibold">$99.00</Typography>
        </div>

        <Button className="w-full py-4 capitalize text-md">Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
