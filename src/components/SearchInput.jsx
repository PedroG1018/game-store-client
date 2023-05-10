import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?query=${search}`);
    }
  };
  return (
    <div className="mb-10 max-w-xl mx-auto">
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