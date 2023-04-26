import React, { useEffect, useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegMinusSquare } from "react-icons/fa";

const Item = ({ item }) => {
  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    const qty = parseInt(item.quantity);
    setQuantity(qty);
  }, [item.quantity]);

  const handleQuantity = (type) => {
    if (type === "+") {
      setQuantity(quantity + 1);
    } else if (type === "-") {
      if (quantity === 1) {
        return;
      }
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="lg:flex mt-10 mb-14 gap-10 justify-center drop-shadow-xl">
      <div className="w-[500px] inline-block justify-center">
        <img src={item.image} alt="product" />
      </div>
      <div className="grid justify-center">
        <h2 className="text-[2rem] font-semibold text-blue-900 mb-1 capitalize">
          {item.name}
        </h2>
        <span className="text-xl text-red-500">${item.price}</span>
        <br />
        <span className="text-lg capitalize">
          <strong>Condition: </strong>
          {item.condition}
        </span>
        <div className="mt-10">
          <span className="text-lg flex items-center">
            <strong className="mr-6">Quantity:</strong>
            <FaRegMinusSquare
              className="mr-4 hover:cursor-pointer"
              onClick={() => handleQuantity("-")}
            />
            <span className="space-x-1 relative">{quantity}</span>
            <FaRegPlusSquare
              className="ml-4 hover:cursor-pointer"
              onClick={() => handleQuantity("+")}
            />
          </span>
        </div>
        <div className="flex justify-center gap-10 mt-8">
          <button className="bg-yellow-300 py-4 px-6 rounded-lg border font-semibold hover:bg-red-600 hover:text-white">
            Add to Cart
          </button>
          <button className="bg-gray-100 py-4 px-6 rounded-lg border font-semibold hover:bg-red-600 hover:text-white">
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
