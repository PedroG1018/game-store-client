import { Typography } from "@material-tailwind/react";
import React from "react";

const Header = ({ title }) => {
  return (
    <div className="bg-blue-900 w-full flex justify-center py-16">
      <Typography variant="h3" className="text-white">
        {title}
      </Typography>
    </div>
  );
};

export default Header;
