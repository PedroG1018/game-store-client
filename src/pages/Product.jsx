import React from "react";
import Item from "../components/ProductPage/Item";
import Details from "../components/ProductPage/Details";
import Reviews from "../components/ProductPage/Reviews";

const Product = () => {
  return (
    <div>
      <Item />
      <Details />
      <Reviews />
    </div>
  );
};

export default Product;
