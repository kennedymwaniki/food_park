import { useDispatch } from "react-redux";
import UpdateQuantity from "../../components/updateQuantity";
import { CartItems } from "./CartSlice";

interface CartItemProps {
  item: CartItems;
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useDispatch();
  const { id, quantity, title, price, totalprice, image } = item;

  // const totalprice = quantity * price;

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
        <UpdateQuantity id={id} currentquantity={quantity} />
      </td>
      <td className="px-4 py-2 font-semibold">${totalprice}</td>
    </tr>
  );
};

export default CartItem;
