import menu8 from "../../assets/images/menu2_img_1.jpg";
import menu2 from "../../assets/images/menu2_img_2.jpg";
import menu3 from "../../assets/images/menu2_img_3.jpg";
import menu4 from "../../assets/images/menu2_img_4.jpg";
import menu5 from "../../assets/images/menu2_img_5.jpg";
import menu6 from "../../assets/images/menu2_img_6.jpg";
import menu7 from "../../assets/images/menu2_img_7.jpg";
import MenuItem from "./MenuItem";

const menuData = [
  {
    id: 1,
    quantity: 1,
    title: "Hyderabadi Biryani",
    category: "Biryani",
    price: 70,
    rating: 4,
    reviews: 10,
    image: menu8,
  },
  {
    id: 2,
    title: "Chicken Masala",
    category: "Chicken",
    price: 80.0,
    discount: 90.0,
    rating: 4.5,
    reviews: 145,
    image: menu2,
  },
  {
    id: 3,
    quantity: 1,

    title: "Grilled Veggies",
    category: "Grill",
    price: 99.0,
    rating: 4,
    reviews: 54,
    image: menu3,
  },
  {
    id: 4,
    quantity: 1,

    title: "Paneer Masala",
    category: "Vegetarian",
    price: 85.0,
    discount: 95.0,
    rating: 4,
    reviews: 74,
    image: menu4,
  },
  {
    id: 5,
    quantity: 1,
    title: "Mixed Fruit Bowl",
    category: "Salad",
    price: 90,
    rating: 4.5,
    reviews: 120,
    image: menu5,
  },
  {
    id: 6,
    quantity: 1,
    title: "Italian Pasta",
    category: "Pasta",
    price: 110,
    rating: 4,
    reviews: 514,
    image: menu6,
  },
  {
    id: 7,
    quantity: 1,
    title: "Italian Pasta",
    category: "Pasta",
    price: 100,
    rating: 4,
    reviews: 514,
    image: menu7,
  },
  {
    id: 8,
    quantity: 1,
    title: "Italian Pasta",
    category: "Pasta",
    price: 95,
    rating: 4,
    reviews: 514,
    image: menu7,
  },
];

const Menu = () => {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {menuData.map((item, index) => (
        <MenuItem
          key={index}
          id={item.id}
          quantity={item.quantity}
          title={item.title}
          category={item.category}
          price={item.price}
          discount={item.discount}
          rating={item.rating}
          reviews={item.reviews}
          image={item.image}
        />
      ))}
    </div>
  );
};

export default Menu;
