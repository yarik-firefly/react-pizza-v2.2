import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type SelectSortTyping = {
  name: string;
  sort: "rating" | "price" | "title";
};

interface FilterSliceTyping {
  inputValue: string;
  selectCategory: number;
  currentPage: number;
  selectSort: SelectSortTyping;
}

const initialState: FilterSliceTyping = {
  inputValue: "",
  selectCategory: 0,
  currentPage: 1,
  selectSort: {
    name: "популярности",
    sort: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSelectCategory(state, action: PayloadAction<number>) {
      state.selectCategory = action.payload;
    },
    setSelectSort(state, action: PayloadAction<SelectSortTyping>) {
      state.selectSort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload + 1;
    },
    setFilters(state, action: PayloadAction<FilterSliceTyping>) {
      state.currentPage = Number(action.payload.currentPage);
      state.selectCategory = +action.payload.selectCategory;
      state.selectSort = action.payload.selectSort;
    },
    setInputValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload;
    },
  },
});

export const filterSelector = (state: RootState) => state.filterSlice;

export const {
  setSelectCategory,
  setSelectSort,
  setCurrentPage,
  setFilters,
  setInputValue,
} = filterSlice.actions;

export default filterSlice.reducer;
