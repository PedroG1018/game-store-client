import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  ShoppingCartIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const profileMenuItems = [
    {
      label: "My Account",
      icon: UserCircleIcon,
      nav: "/account",
    },
    {
      label: "My Cart",
      icon: ShoppingCartIcon,
      nav: "/cart",
    },
  ];

  const handleLogout = (e) => {
    e.preventDefault();

    if (!currentUser) {
      navigate("/login");
      return;
    }

    signOut(auth)
      .then(() => {
        // Sign-out successful
        dispatch({ type: "LOGOUT" });
        toast.success("Logged out");
        navigate("/login");
      })
      .catch((error) => {
        // an error happend
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage);
      });
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="white"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            className="p-0.5 border border-white"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, nav }, key) => {
          return (
            <MenuItem
              key={label}
              onClick={() => navigate(nav)}
              className={`flex items-center gap-2 rounded`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color="inherit"
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
        <MenuItem
          onClick={handleLogout}
          className={`flex items-center gap-2 rounded ${
            currentUser
              ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
              : "hover:bg-blue-500/10 focus:bg-blue-500/10 active:bg-blue-500/10"
          }`}
        >
          <PowerIcon
            className={`h-4 w-4 ${
              currentUser ? "text-red-500" : "text-blue-500"
            }`}
            strokeWidth={2}
          />
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color={currentUser ? "red" : "blue"}
          >
            {currentUser ? <span>Sign Out</span> : <span>Sign In</span>}
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
