import React from "react";
import algoliasearch from "algoliasearch/lite";
import { connectHits, InstantSearch } from "react-instantsearch-dom";
import CustomSearchBox from "../components/CustomSearchBox";
import { useParams } from "react-router";

const Hits = ({ hits }) => (
  <ol>
    {hits.map((hit) => (
      <li key={hit.objectID}>{hit.name}</li>
    ))}
  </ol>
);

const CustomHits = connectHits(Hits);

const Products = () => {
  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_KEY
  );

  const query = new URLSearchParams(window.location.search).get("query");

  console.log(query);

  return (
    <div className="">
      <InstantSearch indexName="products" searchClient={searchClient}>
        <div className="flex justify-center">
          <CustomSearchBox defaultRefinement={query} />
        </div>
        <CustomHits />
      </InstantSearch>
    </div>
  );
};

export default Products;
