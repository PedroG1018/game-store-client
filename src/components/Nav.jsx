import React, {
  Fragment,
  Component,
  useContext,
  useState,
  useEffect,
} from "react";
import icon from "../../src/img/1up.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import {
  Typography,
  Navbar,
  MobileNav,
  IconButton,
} from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/outline";
import ProfileMenu from "./Navbar/ProfileMenu";
import NavList from "./Navbar/NavList";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  const toggleIsNavOpen = () => {
    setIsNavOpen((cur) => !cur);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    signOut(auth)
      .then((userCredential) => {
        // Sign-out successful
        dispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .catch((error) => {
        // an error happend
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage);
      });
  };

  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-bold"
        >
          1-UP Store
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
};

export default Nav;
