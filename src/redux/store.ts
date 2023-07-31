import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from './slices/cart/slice';
import pizzaSlice from "./slices/pizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { filterSlice, cartSlice, pizzaSlice },
});

type FuncType = typeof store.getState;
export type RootState = ReturnType<FuncType>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => {
  useDispatch<AppDispatch>();
}
