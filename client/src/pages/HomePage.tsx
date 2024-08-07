import NavBar from "../components/NavBar";
import Menu from "../features/Menu/Menu";
import Hero from "./Hero";
const HomePage = () => {
  return (
    <div className="h-fit w-full">
      <NavBar />
      <Hero />
      <Menu />
    </div>
  );
};

export default HomePage;
