import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../features/cart/CartSlice";

interface items {
  currentquantity: number;
  id: number;
}
const UpdateQuantity = ({ currentquantity, id }: items) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center">
      <button
        className="bg-red-500 text-white p-1 rounded"
        onClick={() => dispatch(decreaseItemQuantity(id))}
      >
        <FiMinus />
      </button>
      <span className="px-2 text-black">{currentquantity}</span>
      <button
        className="bg-green-500 text-white p-1 rounded"
        onClick={() => dispatch(increaseItemQuantity(id))}
      >
        <FiPlus />
      </button>
    </div>
  );
};

export default UpdateQuantity;
