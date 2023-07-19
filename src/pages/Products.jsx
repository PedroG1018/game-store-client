import React from "react";
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
import SearchInput from "../components/SearchInput";

const Hit = ({ hit }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <a href="#" className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={hit.image}
                alt={hit.name}
                className=" object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{hit.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {hit.price}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_KEY
  );

  return (
    <div className="">
      <h1>React InstantSearch e-commerce demo</h1>
      <InstantSearch indexName="products" searchClient={searchClient}>
        <div className="flex justify-center">
          <SearchBox
            searchAsYouType={false}
            placeholder="Search for Products"
            submitIconComponent={() => <div>Submit</div>}
            classNames={{
              input: <SearchInput />,
            }}
            className=""
          />
        </div>
        <div className="right-panel">
          <Hits hitComponent={Hit} />
          <Pagination />
        </div>
      </InstantSearch>
    </div>
  );
};

export default Products;
