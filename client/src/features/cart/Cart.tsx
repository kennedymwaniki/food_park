import { useDispatch, useSelector } from "react-redux";
import { CartItems, clearCart, getCart } from "./CartSlice";
import CartItem from "./CartItem";

const Cart = () => {
  const cart = useSelector(getCart);
  const clear = useSelector(clearCart);
  const dispatch = useDispatch();

  const ClearCart = (): any => dispatch(clear);

  return (
    <div className="p-4">
      {cart.length === 0 ? (
        <div className="text-red-500 text-center text-xl">
          Your Cart is Empty
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Details</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item: CartItems) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Total Cart</h2>
            <div className="flex justify-between my-2">
              <span>Subtotal:</span>
              <span>
                $
                {cart
                  .reduce((sum, item) => sum + item.totalprice, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between my-2">
              <span>Delivery:</span>
              <span>$00.00</span>
            </div>
            <div className="flex justify-between my-2">
              <span>Discount:</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between font-bold my-2">
              <span>Total:</span>
              <span>
                $
                {(
                  cart.reduce((sum, item) => sum + item.totalprice, 0) - 10
                ).toFixed(2)}
              </span>
            </div>
            <div className="my-4">
              <input
                type="text"
                placeholder="Coupon Code"
                className="w-full p-3 border rounded-lg"
              />
              <button className="w-full mt-2 bg-orange-500 text-white py-2 rounded-lg">
                Apply
              </button>
            </div>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg">
              Checkout
            </button>
            <button
              className="w-full bg-orange-500 text-white py-2 rounded-lg mt-2"
              onClick={ClearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
