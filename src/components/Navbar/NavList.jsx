import {
  UserCircleIcon,
  EnvelopeIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import { Input, MenuItem, Typography } from "@material-tailwind/react";
import React, { createElement, useState } from "react";
import PlatformsMenu from "./PlatformsMenu";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const NavList = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const navListItems = [
    {
      label: "About",
      href: "/about",
      icon: UserCircleIcon,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: EnvelopeIcon,
    },
  ];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/${search}`);
    }
  };
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <PlatformsMenu />
      {navListItems.map(({ label, href, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href={href}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {createElement(icon, { className: "h-[18px] w-[18px]" })} {label}
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
};

export default NavList;
