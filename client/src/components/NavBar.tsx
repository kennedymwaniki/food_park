import logo from "../assets/images/logo.png";
import hamburger from "../assets/icons/hamburger.svg";
import { FaShoppingBasket } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
const NavBar = () => {
  return (
    <div className="flex justify-between items-center text-orange-500 pl-4 shadow-2xl border">
      <div className="logo">
        <img src={logo} alt="" height={40} width={200} />
      </div>
      <nav className="m-4 max-sm:hidden">
        <ul className="flex justify-between gap-4 font-bold">
          <li>Home</li>
          <li>About</li>
          <li>Menu</li>
          <li>Chefs</li>
          <li>Contact</li>
        </ul>
      </nav>
      <section className="justify-between p-4 space-x-4">
        <button>
          <FaShoppingBasket />
        </button>
        <button>
          <FaUser />
        </button>

        <button className="bg-orange-500 text-white rounded-full p-2">
          Reservation
        </button>
      </section>
      <div>
        <button className="hidden max-sm:block">
          <img src={hamburger} alt="" height={60} width={60} />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
