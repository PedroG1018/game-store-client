import React, { useState } from "react";

const Details = () => {
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
    <div className="mx-auto lg:w-[50em] w-[40em]">
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
          <h1 className="text-2xl font-semibold mb-2">Nintendo 64 System</h1>
          <p>
            The Nintendo 64 was one of the first gaming consoles to have four
            controller ports.The most graphically demanding Nintendo 64 games
            that arrived on larger 32 or 64 MB cartridges are the most advanced
            and detailed of the 32-bit/64-bit generation. In order to maximize
            use of the Nintendo 64 hardware developers had to create their own
            custom microcode. Nintendo 64 games running on custom microcode
            benefited from much higher polygon counts in tandem with more
            advanced lighting, animation, physics and AI routines than its
            32-bit competition.
          </p>
        </div>
      )}
      {toggleDetails && (
        <div className="mt-4">
          <ul>
            <li className="mb-2">
              <strong>Region: </strong>NTSC
            </li>
            <li className="mb-2">
              <strong>Platform: </strong>N64
            </li>
            <li>
              <strong>Product: </strong>System
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Details;
