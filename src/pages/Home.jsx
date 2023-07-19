import SearchInput from "../components/SearchInput";
import { Typography } from "@material-tailwind/react";
import Hero from "../components/Home/Hero";
import Featured from "../components/Home/Featured";

const Home = () => {
  return (
    <main className="px-10 mx-auto">
      <SearchInput />
      <Hero />
      <Featured />
    </main>
  );
};

export default Home;
