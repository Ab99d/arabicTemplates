import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cartItems.find(
        (p: any) => p.DesignId === product.DesignId
      );
      if (existingProduct) {
        // console.log("product is already exsist")
      } else {
        state.cartItems.push(product);
        state.quantity += 1;
        state.total += product.Price * 1;
      }
    },
    removeProduct: (state, action) => {
      const nextCartItems = state.cartItems.filter(
        (p) => p.DesignId !== action.payload.DesignId
      );
      state.cartItems = nextCartItems;
      state.quantity -= 1;
      state.total -= action.payload.Price * 1;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.quantity = 0;
    },
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
