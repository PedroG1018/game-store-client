import React from "react";
import CustomSearchBox from "../components/CustomSearchBox";
import CustomHits from "../components/Products/CustomHits";
import { Typography } from "@material-tailwind/react";
import { Configure } from "react-instantsearch-dom";
import CustomPagination from "../components/Products/CustomPagination";

const Products = () => {
  const query = new URLSearchParams(window.location.search).get("query");

  console.log(query);

  return (
    <main className="px-10">
      <CustomSearchBox defaultRefinement={query} />
      {query === null || query === "" ? null : (
        <Typography
          variant="h5"
          className="flex justify-center font-normal mb-6"
        >
          Search results for: <strong>"{query}"</strong>
        </Typography>
      )}
      <Configure hitsPerPage={4} />
      <CustomHits />
      <CustomPagination />
    </main>
  );
};

export default Products;
