import { Action, Dispatch, Store } from "@reduxjs/toolkit";
import {
  addToCart,
  clearCartItems,
  decreamentCartItem,
  fetchCoupon,
  increamentCartItem,
  subTotalSelectTor,
} from "../features/cart/cartSlice";
import { RootState } from "../store";

export const couponMiddleware =
  (store: Store) => (next: Dispatch) => (action: Action) => {
    if (
      action.type === addToCart.type ||
      action.type === increamentCartItem.type ||
      action.type === decreamentCartItem.type ||
      action.type === clearCartItems.type
    ) {
      next(action);
      const state: RootState = store.getState();
      const subTotal = subTotalSelectTor(state);
      store.dispatch(
        fetchCoupon({
          shopId: state.cart.shopId,
          couponCode: state.cart.coupon.code,
          subTotal: subTotal,
        }) as unknown as Action
      );
    } else {
      next(action);
    }
  };