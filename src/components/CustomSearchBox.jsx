import React from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";

const CustomSearchBox = (props) => {
  const { query, refine, clear, isSearchStalled } = useSearchBox(props);

  return <div>hey</div>;
};

export default CustomSearchBox;
