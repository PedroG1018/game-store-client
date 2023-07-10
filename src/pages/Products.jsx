import React, { useEffect, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  ClearRefinements,
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
} from "react-instantsearch-hooks-web";

const Hit = (props) => {
  return (
    <div>
      <img src={props.hit.image} align="left" alt={props.hit.name} />
      <div className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="description" hit={props.hit} />
      </div>
      <div className="hit-price">${props.hit.price}</div>
    </div>
  );
};

const Products = () => {
  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_KEY
  );
  return (
    <div className="ais-InstantSearch">
      <h1>React InstantSearch e-commerce demo</h1>
      <InstantSearch indexName="products" searchClient={searchClient}>
        <div className="left-panel">
          <ClearRefinements />
          <h2>Brands</h2>
          <RefinementList attribute="platform" />
          <Configure hitsPerPage={3} />
        </div>
        <div className="right-panel">
          <SearchBox />
          <Hits />
          <Pagination />
        </div>
      </InstantSearch>
    </div>
  );
};

export default Products;
