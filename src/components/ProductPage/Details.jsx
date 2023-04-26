import React, { useState } from "react";

const Details = ({ details }) => {
  const [toggleDescription, setToggleDescription] = useState(true);
  const [toggleDetails, setToggleDetails] = useState(false);

  const handleToggle = (type) => {
    if (type === "desc") {
      setToggleDescription(true);
      setToggleDetails(false);
    } else if (type === "details") {
      setToggleDescription(false);
      setToggleDetails(true);
    }
  };

  return (
    <div className="mx-auto lg:w-full mb-4">
      <div className="flex gap-1">
        <button
          className="bg-gray-100 px-6 py-4 hover:bg-blue-700 hover:text-white active active:bg-blue-700"
          onClick={() => handleToggle("desc")}
        >
          Description
        </button>
        <button
          className="bg-gray-100 px-6 py-4 hover:bg-blue-700 hover:text-white"
          onClick={() => handleToggle("details")}
        >
          Details
        </button>
      </div>
      <hr className="bg-blue-700 h-px border-0" />
      {toggleDescription && (
        <div className="mt-4">
          <p>{details.desc}</p>
        </div>
      )}
      {toggleDetails && (
        <div className="mt-4">
          <ul>
            <li className="mb-2">
              <strong>Region: </strong>
              {details.region}
            </li>
            <li className="mb-2">
              <strong>Platform: </strong>
              {details.platform}
            </li>
            <li>
              <strong>Product: </strong>
              {details.type}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Details;
