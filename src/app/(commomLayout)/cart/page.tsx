import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import Coupon from "@/components/modules/cart/Coupon";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import ProductBanner from "@/components/modules/product/banner";
import MySection from "@/components/shared/MySection/MySection";
import React from "react";

const CartPage = () => {
  return (
    <div>
      <ProductBanner title="Cart Page" path="Home - Cart Page" />
      <MySection>
        <div className="grid md:grid-cols-1 lg:grid-cols-12 gap-6">
          <CartProducts />
          <Coupon />
          <Address />
          <PaymentDetails />
        </div>
      </MySection>
    </div>
  );
};

export default CartPage;
