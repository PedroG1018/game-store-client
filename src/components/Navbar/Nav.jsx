import React, { useState, useEffect } from "react";
import {
  Typography,
  Navbar,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/outline";
import ProfileMenu from "./ProfileMenu";
import NavList from "./NavList";
import icon from "../../img/1up.png";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  const toggleIsNavOpen = () => {
    setIsNavOpen((cur) => !cur);
  };

  return (
    <Navbar
      className="bg-blue-900 max-w-full rounded-none border-b-2 border-white"
      shadow={false}
      color="bg-blue-900"
    >
      <div className="relative mx-auto flex items-center text-white">
        <a href="/">
          <div className="flex items-center">
            <Typography className="mr-2 ml-2 py-1.5 font-bold">1-Up</Typography>
            <img src={icon} className="h-8" alt="logo" />
            <Typography className="mr-2 ml-2 py-1.5 font-bold">
              Store
            </Typography>
          </div>
        </a>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="white"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
};

export default Nav;
