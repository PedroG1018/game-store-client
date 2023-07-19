import React, { useCallback } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";
import { TextField } from "@mui/material";

const CustomSearchBox = (props) => {
  const memoizedSearch = useCallback((query, search) => {
    search(query);
  }, []);

  const { refine } = useSearchBox({
    queryHook: memoizedSearch,
  });

  const handleChange = (event) => {
    refine(event.target.value);
  };

  return <TextField onChange={handleChange} />;
};

export default CustomSearchBox;
