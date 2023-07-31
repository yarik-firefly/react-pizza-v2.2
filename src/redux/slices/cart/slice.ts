import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import getPizzaFromLS from "../../../utils/getPizzaFromLS";
import calcTotalPrice from "../../../utils/calcTotalPrice";
import { RootState } from "../../store";

const { items, totalPrice } = getPizzaFromLS();

const initialState: CartSliceTyping = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ItemsTyping>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<ItemsTyping>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.totalPrice - findItem.price
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const cartSelector = (state: RootState) => state.cartSlice;

export const { addToCart, removeFromCart, clearCart, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
