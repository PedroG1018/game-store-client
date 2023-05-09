import { StarIcon } from "@heroicons/react/24/solid";
import icon from "../img/1up.png";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import { useState } from "react";
import SearchInput from "../components/SearchInput";

const Home = () => {
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/N64-Console-Set.png",
      name: "Nintendo 64 (Black)",
      price: 169.99,
      rating: 4.95,
      reviews: 376,
    },
    {
      id: 2,
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/N64-Console-Set.png",
      name: "Nintendo 64 (Black)",
      price: 169.99,
      rating: 4.95,
      reviews: 376,
    },
    {
      id: 3,
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/N64-Console-Set.png",
      name: "Nintendo 64 (Black)",
      price: 169.99,
      rating: 4.95,
      reviews: 376,
    },
    {
      id: 4,
      img: "https://upload.wikimedia.org/wikipedia/commons/0/02/N64-Console-Set.png",
      name: "Nintendo 64 (Black)",
      price: 169.99,
      rating: 4.95,
      reviews: 376,
    },
  ];

  return (
    <main className="px-10 pt-4 max-w-screen-xl mx-auto">
      <SearchInput />
      <div className="flex mx-auto space-x-2 text-center">
        <div>
          <img src={icon} alt="logo" className="w-full" />
        </div>
        <div className="text-blue-800">
          <h1 className="font-bold">1-UP GAME STORE</h1>
          <p className="pt-6">
            Buy used video games, original game systems and old school gaming
            accessories at the largest family run retro video game online store.
            Shop all our vintage 100% authentic products, with a and free
            domestic shipping on orders over $10!
          </p>
        </div>
      </div>
      <div className="pt-6 text-center">
        <h1 className="font-semibold text-3xl">Featured Products</h1>
        <div
          className="grid grid-cols-1 md:grid-cols-4 items-center pt-4 gap-2 cursor-pointer"
          onClick={() => navigate("/YTZt4s9H3I5du6ZIHSdp")}
        >
          {data.map((product) => (
            <div className="p-10 border-4 border-black" key={product.id}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/02/N64-Console-Set.png"
                alt="product"
              />
              <h2 className="hover:text-red-500">Nintendo 64 System (Black)</h2>
              <p>From: $169.99</p>
              <div className="flex items-center justify-center">
                <StarIcon className="w-5 h-5 text-yellow-600" />

                <p className="ml-2 text-sm font-bold text-gray-900">4.95</p>
                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                <a
                  href="/YTZt4s9H3I5du6ZIHSdp/#reviews"
                  className="text-sm font-medium text-gray-900 no-underline hover:underline"
                >
                  {product.reviews} reviews
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
