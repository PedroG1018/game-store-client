import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <main className="p-10">
      <div className="flex mx-auto justify-items-center space-x-2">
        <div>
          <img src="" alt="dkolies" className="max-w-fit"></img>
        </div>
        <div className="text-blue-800">
          <h1 className="font-bold">1-UP GAME STORE</h1>
          <p className="pt-6">
            Buy used video games, original game systems and old school gaming
            accessories at the largest family run retro video game online store.
            Shop all our vintage 100% authentic products, with a{" "}
            <a href="#" className="text-black underline">
              free 1 year warranty
            </a>{" "}
            and free domestic shipping on orders over $10!
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;
