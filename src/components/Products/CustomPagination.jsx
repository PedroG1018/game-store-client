import { Typography } from "@material-tailwind/react";
import { connectPagination } from "react-instantsearch-dom";

const Pagination = ({ currentRefinement, nbPages, refine, createURL }) => (
  <div className="flex justify-center mt-6">
    {new Array(nbPages).fill(null).map((_, index) => {
      const page = index + 1;
      const style = {
        fontWeight: currentRefinement === page ? "bold" : "",
      };

      return (
        <Typography
          as="a"
          href={createURL(page)}
          style={style}
          onClick={(event) => {
            event.preventDefault();
            refine(page);
          }}
          className="border border-black border-opacity-50 p-3"
        >
          {page}
        </Typography>
      );
    })}
  </div>
);

const CustomPagination = connectPagination(Pagination);

export default CustomPagination;
