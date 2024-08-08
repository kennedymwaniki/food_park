import NavBar from "../components/NavBar";
import Cart from "../features/cart/Cart";
import Menu from "../features/Menu/Menu";
import Hero from "./Hero";
const HomePage = () => {
  return (
    <div className="h-fit w-full">
      <NavBar />
      <Hero />
      <Menu />
      <Cart />
    </div>
  );
};

export default HomePage;
