import { UserCircleIcon } from "@heroicons/react/24/outline";
import { MenuItem, Typography } from "@material-tailwind/react";
import React, { createElement } from "react";
import NavListMenu from "./NavListMenu";

const NavList = () => {
  const navListItems = [
    {
      label: "Account",
      href: "/account",
      icon: UserCircleIcon,
    },
    {
      label: "About Us",
      href: "/about",
      icon: UserCircleIcon,
    },
    {
      label: "Cart",
      href: "/cart",
      icon: UserCircleIcon,
    },
  ];
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
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
