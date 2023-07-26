import { Typography } from "@material-tailwind/react";
import React from "react";
import { connectHits } from "react-instantsearch-dom";

const Hits = ({ hits }) => {
  if (hits.length === 0) {
    return <h1>Nothing</h1>;
  }

  return (
    <div className="pl-8">
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
        {hits.map((hit) => (
          <a
            key={hit.objectID}
            href={"product/" + hit.objectID}
            className="group bg-gray-100 hover:drop-shadow-lg sm:flex sm:flex-col justify-between grid grid-cols-2"
          >
            <div className="flex my-auto">
              <img
                src={hit.image}
                alt={hit.name}
                className="object-contain object-center p-4 group-hover:opacity-75"
              />
            </div>
            <div className="flex flex-col">
              <Typography className="mt-2 font-medium text-md mx-4">
                {hit.name}
              </Typography>
              <Typography className="mt-1 mb-4 text-lg mx-4 font-semibold text-gray-900">
                ${hit.price}
              </Typography>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const CustomHits = connectHits(Hits);

export default CustomHits;
