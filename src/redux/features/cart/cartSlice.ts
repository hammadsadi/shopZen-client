import { RootState } from "@/redux/store";
import { TProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  products: TProduct[];
}

const initialState: IInitialState = {
  products: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export const orderedProductSelector = (state: RootState) => {
  return state.cart.products;
};
export default cartSlice.reducer;
