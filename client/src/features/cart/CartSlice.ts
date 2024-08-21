import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface CartItems {
  id: number;
  title: string;
  quantity: number;
  price: number;
  totalprice: number;
  image: string;
}
export interface CartState {
  cart: CartItems[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItems>) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);

      if (item) {
        item.quantity++;
        item.totalprice = item.quantity * item.price;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        item.totalprice = item.quantity * item.price;
      }

      if (item?.quantity === 0)
        cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

//!get the current cart
export const getCart = (state: { cart: CartState }) => state.cart.cart;

//! get the totalItems in the cart
export const getTotalItems = (state: { cart: CartState }) =>
  state.cart.cart.length;

//or
//export const getTotalCartItems = (state: { cart: CartState }) => state.cart.cart.reduce((sum,item)=> sum + item.quantity,0)

//get an item's quantity by id
export const getCurrentItemById =
  (id: number) => (state: { cart: CartState }) =>
    state.cart.cart.find((item) => item.id === id)?.quantity ?? 0;

export const {
  addItem,
  deleteItem,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
