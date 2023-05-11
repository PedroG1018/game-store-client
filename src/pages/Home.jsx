import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import Brands from "../components/Home/Brands";
import ImageCarousel from "../components/ImageCarousel";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  return (
    <>
      <main className="px-10 pt-4 max-w-screen-xl mx-auto">
        <SearchInput />
        <ImageCarousel type="overall" />
        <Brands />
      </main>
    </>
  );
};

export default Home;
