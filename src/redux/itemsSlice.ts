import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "FileType",
  initialState: {
    currentFile: [],
    currentPrice: ["0"],
    currentTags: [],
    customSearch: "",
    categoryFilter: "all",
    isLoading: false,
  },
  reducers: {
    getCurrentType(state, action: any) {
      if (!state.currentFile.includes(action.payload)) {
        state.currentFile.push(action.payload);
      } else {
        state.currentFile = state.currentFile.filter(
          (item) => item !== action.payload
        );
      }
    },
    getCurrentPrice(state, action: any) {
      if (!state.currentPrice.includes(action.payload)) {
        state.currentPrice.push(action.payload);
      } else {
        state.currentPrice = state.currentPrice.filter(
          (item) => item !== action.payload
        );
      }
    },
    getCurrentTags(state, action: any) {
      if (!state.currentTags.includes(action.payload)) {
        state.currentTags.push(action.payload);
      } else {
        state.currentTags = state.currentTags.filter(
          (item) => item !== action.payload
        );
      }
    },
    customSearch(state, action: any) {
      state.customSearch = action.payload;
    },
    customSearchReset(state) {
      state.customSearch = "";
    },
    categoryFilter(state, action: any) {
      state.categoryFilter = action.payload;
    },
    reset(state) {
      state.currentFile = [];
      state.currentPrice = ["0"];
      state.currentTags = [];
      state.customSearch = "";
    },
  },
});

export const {
  getCurrentType,
  getCurrentPrice,
  getCurrentTags,
  customSearch,
  categoryFilter,
  customSearchReset,
  reset,
} = itemsSlice.actions;
export default itemsSlice.reducer;
