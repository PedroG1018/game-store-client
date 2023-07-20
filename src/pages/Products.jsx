import React from "react";
import CustomSearchBox from "../components/CustomSearchBox";
import CustomHits from "../components/Products/CustomHits";

const Products = () => {
  const query = new URLSearchParams(window.location.search).get("query");

  return (
    <div className="">
      <CustomSearchBox defaultRefinement={query} />
      <CustomHits />
    </div>
  );
};

export default Products;
