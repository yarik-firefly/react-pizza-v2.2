import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { BlockTyping } from "../../components/PizzaBlock";
import { SelectSortTyping } from "./filterSlice";

type FetchPizzasTyping = {
  currentPage: number;
  inputValue: string;
  selectCategory: number;
  selectSort: SelectSortTyping[];
};

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzas",
  async (params: FetchPizzasTyping) => {
    const { currentPage, inputValue, selectCategory, selectSort } = params;
    const { data } = await axios.get<BlockTyping[]>(
      `https://6490ad001e6aa71680cba4bb.mockapi.io/pizzas?page=${currentPage}&limit=4&${
        inputValue ? `search=${inputValue}` : ""
      }&${selectCategory > 0 ? `category=${selectCategory}` : ""}&sortBy=${
        selectSort.sort
      }&order=desc`
    );

    return data;
  }
);

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  REJECTED = "rejected",
}

interface PizzaSliceTyping {
  pizzas: BlockTyping[];
  status: Status.LOADING | Status.SUCCESS | Status.REJECTED;
}

const initialState: PizzaSliceTyping = {
  pizzas: [],
  status: Status.LOADING, //'loading' | 'success' | 'rejected'
};

const pizzaSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.REJECTED;
      state.pizzas = [];
    });
  },

  // Вариант написания без TypeScript

  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = "loading";
  //     state.pizzas = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.pizzas = action.payload;
  //     state.status = "success";
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = "rejected";
  //     state.pizzas = [];
  //   },
  // },
});

export const pizzaSelector = (state: RootState) => state.pizzaSlice;

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
