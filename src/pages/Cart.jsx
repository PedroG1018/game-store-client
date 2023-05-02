import React, { Fragment, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";

const Cart = () => {
  return (
    <div className="flex flex-col mx-auto max-w-screen-lg w-full justify-center my-10">
      <Typography variant="h3" className="text-center mb-8">
        Your Cart
      </Typography>
      <div className="w-[48em] justify-center mx-auto">
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
            </div>
          </div>
          <div>hey</div>
          <div>hey</div>
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
            </div>
          </div>
          <div>hey</div>
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
            </div>
          </div>
          <div>hey</div>
        </div>
        <hr />
      </div>
      <div className="w-[36em] justify-center items-center mx-auto">
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
