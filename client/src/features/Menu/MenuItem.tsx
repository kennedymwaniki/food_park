import {
  FaShoppingCart,
  FaHeart,
  FaEye,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";

interface MenuItemProps {
  title: string;
  category: string;
  price: string;
  discount?: string;
  rating: number;
  reviews: number;
  image: string;
}

const MenuItem = ({
  title,
  category,
  price,
  discount,
  rating,
  reviews,
  image,
}: MenuItemProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <span className="absolute top-2 left-2 bg-orange-500 text-white text-sm px-2 py-1 rounded-full">
          {category}
        </span>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-orange-500 text-xl font-bold">
            {discount ? (
              <div className="flex items-center">
                <span className="mr-2">{price}</span>
                <span className="line-through text-gray-500">{discount}</span>
              </div>
            ) : (
              <span>{price}</span>
            )}
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className="text-yellow-400">
                {i < rating ? (
                  <FaStar />
                ) : i === Math.floor(rating) && rating % 1 !== 0 ? (
                  <FaStarHalfAlt />
                ) : (
                  <FaStar className="text-gray-300" />
                )}
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-600">— {reviews}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button className="bg-orange-500 text-white rounded-full px-4 py-2 hover:bg-orange-600">
            <FaShoppingCart />
          </button>
          <button className="bg-gray-200 text-gray-600 rounded-full px-4 py-2 hover:bg-gray-300">
            <FaHeart />
          </button>
          <button className="bg-gray-200 text-gray-600 rounded-full px-4 py-2 hover:bg-gray-300">
            <FaEye />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
