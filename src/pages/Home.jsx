import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import Brands from "../components/Home/Brands";
import ImageCarousel from "../components/ImageCarousel";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Typography } from "@material-tailwind/react";
import Welcome from "../components/Home/Welcome";

const Home = () => {
  return (
    <main className="px-10 pt-4 max-w-screen-lg mx-auto">
      <SearchInput />
      <Welcome />
      <Typography variant="h3" className="text-center mb-4">
        Featured Products
      </Typography>
      <ImageCarousel type="overall" />
      <Typography variant="h3" className="text-center mt-10 mb-4">
        Brands
      </Typography>
      <Brands />
    </main>
  );
};

export default Home;
