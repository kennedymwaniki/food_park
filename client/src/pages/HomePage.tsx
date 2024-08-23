import NavBar from "../components/NavBar";
import Cart from "../features/cart/Cart";
import Menu from "../features/Menu/Menu";
import About from "./About";
import Hero from "./Hero";
import Signin from "./Signin";

const HomePage = () => {
  return (
    <div className="h-fit">
      <NavBar />
      <Hero />
      <Menu />
      <About />
      <Cart />
      <Signin />
    </div>
  );
};

export default HomePage;
