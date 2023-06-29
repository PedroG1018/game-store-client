import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, RefinementList } from "react-instantsearch-hooks-web";

const SearchInput = () => {
  const [search, setSearch] = useState("");

  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_KEY
  );

  const navigate = useNavigate();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?query=${search}`);
    }
  };
  return (
    <div className="mb-10 max-w-xl mx-auto">
      <InstantSearch searchClient={searchClient} indexName="products">
        <RefinementList attribute="name" />
      </InstantSearch>
      <Input
        placeholder="Search for products"
        variant="static"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        icon={<MagnifyingGlassIcon />}
      />
    </div>
  );
};

export default SearchInput;
