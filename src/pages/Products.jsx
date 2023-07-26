import React, { useEffect, useState } from "react";
import CustomSearchBox from "../components/CustomSearchBox";
import CustomHits from "../components/Products/CustomHits";
import { Typography } from "@material-tailwind/react";
import {
  Configure,
  Panel,
  RefinementList,
  SortBy,
} from "react-instantsearch-dom";
import CustomPagination from "../components/Products/CustomPagination";

const Products = () => {
  const [query, setQuery] = useState(null);
  const [platform, setPlatform] = useState(null);

  useEffect(() => {
    setQuery(new URLSearchParams(window.location.search).get("query"));
    setPlatform(new URLSearchParams(window.location.search).get("platform"));
  }, []);

  return (
    <main className="px-10 max-w-[1200px] m-auto p-[1rem]">
      <CustomSearchBox defaultRefinement={query} />
      {query === null || query === "" ? null : (
        <Typography
          variant="h5"
          className="flex justify-center font-normal mb-6"
        >
          Search results for: <strong>"{query}"</strong>
        </Typography>
      )}
      <Configure hitsPerPage={8} />
      <div className="flex">
        <div className="flex-1">
          <Panel header="platform">
            <RefinementList attribute="platform" />
          </Panel>
          <Panel header="company">
            <RefinementList
              attribute="company"
              defaultRefinement={[platform] ? platform : []}
            />
          </Panel>
        </div>
        <div className="flex-3">
          <CustomHits />
        </div>
      </div>
      <CustomPagination />
    </main>
  );
};

export default Products;
