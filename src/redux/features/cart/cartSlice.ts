import { RootState } from "@/redux/store";
import { addDiscountCoupon } from "@/services/Cart";
import { TDiscount, TProduct } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ICartInterface extends TProduct {
  productQuantity: number;
}

interface IInitialState {
  products: ICartInterface[];
  city: string;
  shippingAddress: string;
  shopId: string;
  coupon: {
    code: string;
    discountAmount: number;
    isLoading: boolean;
    error: string;
  };
}

const initialState: IInitialState = {
  products: [],
  city: "",
  shippingAddress: "",
  shopId: "",
  coupon: {
    code: "",
    discountAmount: 0,
    isLoading: false,
    error: "",
  },
};

// Async Thunk
export const fetchCoupon = createAsyncThunk(
  "cart/fetchCoupon",
  async (couponData: TDiscount) => {
    try {
      const res = await addDiscountCoupon(couponData);
      if (!res.success) {
        throw new Error(res.message);
      }
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add To Cart
    addToCart: (state, action) => {
      if (state.products.length === 0) {
        state.shopId = action.payload.shop._id;
      }
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

    // City Update
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    // Shipping Address Update
    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },

    // Clear Cart Item
    clearCartItems: (state) => {
      state.products = [];
      state.city = "";
      state.shippingAddress = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoupon.pending, (state) => {
      state.coupon.isLoading = true;
      state.coupon.error = "";
    });
    builder.addCase(fetchCoupon.rejected, (state, action) => {
      state.coupon.isLoading = false;
      state.coupon.error = action.error.message as string;
      state.coupon.code = "";
      state.coupon.discountAmount = 0;
    });
    builder.addCase(fetchCoupon.fulfilled, (state, action) => {
      state.coupon.isLoading = false;
      state.coupon.error = "";
      state.coupon.code = action.payload.data.coupon.code;
      state.coupon.discountAmount = action.payload.data.coupon.discountAmount;
    });
  },
});

// Actions
export const {
  addToCart,
  increamentCartItem,
  decreamentCartItem,
  updateCity,
  updateShippingAddress,
  clearCartItems,
} = cartSlice.actions;

// Selectors
export const orderedProductSelector = (state: RootState) => {
  return state.cart.products;
};
// Subtotal Selector
export const subTotalSelectTor = (state: RootState) => {
  return state.cart.products.reduce((acc, product) => {
    if (product.offerPrice) {
      return acc + product.offerPrice * product.productQuantity;
    } else {
      return acc + product.price * product.productQuantity;
    }
  }, 0);
};

// Shop Selector
export const shopSelector = (state: RootState) => {
  return state.cart.shopId;
};

// Shipping address Selector
export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};

// City Selector
export const citySelector = (state: RootState) => {
  return state.cart.city;
};

// Discount Selector
export const discountSelector = (state: RootState) => {
  return state.cart.coupon;
};

// Order Selector
export const orderSelector = (state:RootState) =>{
  return {
    products: state.cart?.products.map((product) => ({
      product: product._id,
      quantity: product.productQuantity,
      color: "White",
    })),
    shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
    paymentMethod: "Online",
  };
}

// Shipping Cost Selector
export const shippingCostSelector = (state: RootState) => {
  if (
    state.cart.city &&
    state.cart.city === "Dhaka" &&
    state.cart.products.length > 0
  ) {
    return 60;
  } else if (
    state.cart.city &&
    state.cart.city !== "Dhaka" &&
    state.cart.products.length > 0
  ) {
    return 120;
  } else {
    return 0;
  }
};


// Grand Total Selector
export const grandTotalSelector = (state:RootState) =>{
  const subTotal = subTotalSelectTor(state);
  const shippingCost = shippingCostSelector(state);
  return subTotal + shippingCost;
}


// Export Reducer
export default cartSlice.reducer;
