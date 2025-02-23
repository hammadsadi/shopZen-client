import { RootState } from "@/redux/store";
import { TProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";


export interface ICartInterface extends TProduct {
  productQuantity: number;
}

interface IInitialState {
  products: ICartInterface[];
}

const initialState: IInitialState = {
  products: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add To Cart
    addToCart: (state, action) => {
      const isExistProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (isExistProduct) {
        isExistProduct.productQuantity += 1;
        return;
      }
      state.products.push({ ...action.payload, productQuantity: 1 });
    },
    // Cart Item Increament
    increamentCartItem: (state, action) => {
      const productFind = state.products.find(
        (product) => product._id === action.payload
      );
      if (productFind) {
        productFind.productQuantity += 1;
      }
    },
    // Cart Item Decreament
    decreamentCartItem: (state, action) => {
      const productFind = state.products.find(
        (product) => product._id === action.payload
      );
      if (productFind && productFind.productQuantity > 1) {
        productFind.productQuantity -= 1;
      }
    },
  },
});

export const { addToCart, increamentCartItem, decreamentCartItem } =
  cartSlice.actions;
export const orderedProductSelector = (state: RootState) => {
  return state.cart.products;
};
export default cartSlice.reducer;
