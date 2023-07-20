import React, { useCallback, useState } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";
import { TextField } from "@mui/material";
import { connectSearchBox } from "react-instantsearch-core";
import { useNavigate } from "react-router";

const SearchBox = ({ currentRefinement, refine }) => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/products?query=${search}`);
      window.location.reload();
    }
  };

  return (
    <div className="mb-10 max-w-xl mx-auto">
      <Input
        placeholder="Search for products"
        variant="static"
        icon={<MagnifyingGlassIcon />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
