import SearchInput from "../components/SearchInput";
import { Typography } from "@material-tailwind/react";
import Hero from "../components/Home/Hero";
import Featured from "../components/Home/Featured";

const Home = () => {
  return (
    <main className="px-10 w-full mx-auto">
      <SearchInput />
      <Hero />
      <Featured />
    </main>
  );
};

export default Home;
