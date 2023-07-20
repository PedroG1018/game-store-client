import Hero from "../components/Home/Hero";
import Featured from "../components/Home/Featured";
import CustomSearchBox from "../components/CustomSearchBox";

const Home = () => {
  return (
    <main className="px-10 mx-auto">
      <CustomSearchBox />
      <Hero />
      <Featured />
    </main>
  );
};

export default Home;
