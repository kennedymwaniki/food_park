import NavBar from "../components/NavBar";
import Cart from "../features/cart/Cart";
import Menu from "../features/Menu/Menu";
import Hero from "./Hero";
import Signin from "./Signin";

const HomePage = () => {
  return (
    <div className="h-fit w-full">
      <NavBar />
      <Hero />
      <Menu />
      <Cart />
      <Signin />
    </div>
  );
};

export default HomePage;
