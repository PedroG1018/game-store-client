import { Button, Typography } from "@material-tailwind/react";
import React from "react";

const Checkout = ({ subTotal, disabled, checkout }) => {
  return (
    <div className="md:w-[36em] w-[30em] justify-center items-center mx-auto mt-6">
      <div className="md:w-[36em] w-[30em] justify-center items-center mx-auto mt-6">
        <div className="flex justify-between mb-6">
          <Typography className="font-semibold">Subtotal</Typography>
          <Typography className="font-semibold">${subTotal}</Typography>
        </div>

        <Button
          className="w-full capitalize text-md rounded-none bg-blue-900"
          size="lg"
          disabled={disabled}
          onClick={checkout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
