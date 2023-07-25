import { Typography } from "@material-tailwind/react";
import React from "react";
import { connectHits } from "react-instantsearch-dom";

const Hits = ({ hits }) => {
  if (hits.length === 0) {
    return <h1>Nothing</h1>;
  }

  console.log(hits);

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-10 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
        {hits.map((hit) => (
          <a
            key={hit.objectID}
            href={"product/" + hit.objectID}
            className="group bg-gray-100 hover:drop-shadow-lg"
          >
            <div className="aspect-h-1 aspect-w-1 w-full xl:aspect-h-8 xl:aspect-w-7 ">
              <img
                src={hit.image}
                alt={hit.name}
                className="h-full w-full object-contain object-center p-4 group-hover:opacity-75"
              />
            </div>
            <Typography className="mt-2 font-medium text-md ml-4">
              {hit.name}
            </Typography>
            <Typography className="mt-1 mb-4 text-lg ml-4 font-semibold text-gray-900">
              ${hit.price}
            </Typography>
          </a>
        ))}
      </div>
    </div>
  );
};

const CustomHits = connectHits(Hits);

export default CustomHits;
