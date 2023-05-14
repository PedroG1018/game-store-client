import { Typography } from "@material-tailwind/react";
import React from "react";
import icon from "../../img/1up.png";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex items-center space-x-4 mb-4">
        <Typography variant="h2">Welcome to 1-Up</Typography>
        <img src={icon} className="w-14" alt="logo" />
        <Typography variant="h2">Store!</Typography>
      </div>
      <Typography variant="h5" className="text-center w-[30em] text-gray-800">
        Browse a vast collection of the latest and greatest titles, spanning
        genres, platforms, and generations. Get ready to level up your gaming
        experience!
      </Typography>
    </div>
  );
};

export default Welcome;
