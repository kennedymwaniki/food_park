import { CartItems } from "./CartSlice";
import { FiMinus, FiPlus } from "react-icons/fi";

interface CartItemProps {
  item: CartItems;
}

const CartItem = ({ item }: CartItemProps) => {
  const { id, quantity, title, price, totalprice, image } = item;

  return (
    <tr key={id}>
      <td className="px-4 py-2">
        <img
          src={image}
          alt={title}
          className="w-16 h-16 rounded-full object-cover"
        />
      </td>
      <td className="px-4 py-2">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">Medium</p>
        <p className="text-sm text-gray-600">Coca-Cola</p>
        <p className="text-sm text-gray-600">7up</p>
      </td>
      <td className="px-4 py-2 font-semibold">${price}</td>
      <td className="px-4 py-2">
        <div className="flex items-center">
          <button className="bg-red-500 text-white p-1 rounded">
            <FiMinus />
          </button>
          <span className="px-2">{quantity}</span>
          <button className="bg-green-500 text-white p-1 rounded">
            <FiPlus />
          </button>
        </div>
      </td>
      <td className="px-4 py-2 font-semibold">${totalprice}</td>
    </tr>
  );
};

export default CartItem;
