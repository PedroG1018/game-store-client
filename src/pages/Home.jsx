import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import Brands from "../components/Home/Brands";
import ImageCarousel from "../components/ImageCarousel";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Typography } from "@material-tailwind/react";

const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  return (
    <>
      <main className="px-10 pt-4 max-w-screen-xl mx-auto">
        <SearchInput />
        <Typography
          variant="h3"
          className="text-center underline underline-offset-8 mb-4"
        >
          Featured Products
        </Typography>
        <ImageCarousel type="overall" />
        <Typography
          variant="h3"
          className="text-center underline underline-offset-8 mt-10 mb-4"
        >
          Brands
        </Typography>
        <Brands />
      </main>
    </>
  );
};

export default Home;
