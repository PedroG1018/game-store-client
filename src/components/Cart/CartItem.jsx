import { Typography } from "@material-tailwind/react";
import React from "react";

const CartItem = ({ product, qty, handleQuantityChange, handleRemove }) => {
  return (
    <div className="flex justify-between my-6">
      <div className="flex space-x-2">
        <img
          src={product.data().image}
          alt={product.data().name}
          className="object-contain"
        />
        <div>
          <Typography
            className="font-medium hover:underline"
            as="a"
            href={`/product/${product.id}`}
          >
            {product.data().name}
          </Typography>
          <Typography className="capitalize">
            {product.data().condition}
          </Typography>
          {product.data().quantity === 0 ? (
            <Typography color="red">Out of Stock</Typography>
          ) : (
            <Typography color="green" className="font-semibold">
              In Stock
            </Typography>
          )}

          <div className="flex space-x-2 mt-4">
            <select
              label="Qty"
              className="w-[4em] h-[2em] border border-gray-400 rounded-lg"
              defaultValue={qty}
              onChange={handleQuantityChange}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </select>
            <Typography
              className="text-red-500 font-medium mt-2 cursor-pointer hover:font-semibold my-auto"
              onClick={handleRemove}
            >
              Remove
            </Typography>
          </div>
        </div>
      </div>
      <Typography className="font-medium">
        ${(product.data().price * qty).toFixed(2)}
      </Typography>
    </div>
  );
};

export default CartItem;
