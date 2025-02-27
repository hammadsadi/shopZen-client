"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { currencyFormatter } from "@/lib/currencyFormatter";
import {
  citySelector,
  clearCartItems,
  discountAmountSelector,
  discountSelector,
  grandTotalSelector,
  orderedProductSelector,
  orderSelector,
  shippingAddressSelector,
  shippingCostSelector,
  subTotalSelectTor,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createUserOrder } from "@/services/Cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PaymentDetails() {
  const subTotal = useAppSelector(subTotalSelectTor);
  const shppingCost = useAppSelector(shippingCostSelector);
  const orders = useAppSelector(orderSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const discountAmount = useAppSelector(discountAmountSelector);
  const cityName = useAppSelector(citySelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const orderedProducts = useAppSelector(orderedProductSelector);
  const coupon = useAppSelector(discountSelector);
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useAppDispatch();
  // Handle Order Now
  const handleOrderNow = async () => {
    const orderLoading = toast.loading("Order Being Placed");
    try {
      if (!user) {
        router.push("/login");
        throw new Error("User is not Logged In");
      }
      if (!cityName) {
        throw new Error("City is Missing");
      }
      if (!shippingAddress) {
        throw new Error("Shipping Address is Missing");
      }
      if (orderedProducts.length === 0) {
        throw new Error("Cart is Empty. What are you trying to Order?");
      }
      let orderData;
      if (coupon.code) {
        orderData = { ...orders, coupon: coupon.code };
      } else {
        orderData = orders;
      }
      const res = await createUserOrder(orderData);
      if (res?.success) {
        toast.success(res.message, { id: orderLoading });
        dispatch(clearCartItems());
        router.push(res.data.paymentUrl);
      }

      if (!res.success) {
        toast.error(res.message, { id: orderLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };
  return (
    <div className=" border bg-white rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-gray-500 ">Subtotal</p>
          <p className="font-semibold">{currencyFormatter(subTotal)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500 ">Discount</p>
          <p className="font-semibold">{currencyFormatter(discountAmount)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500 ">Shipment Cost</p>
          <p className="font-semibold">{currencyFormatter(shppingCost)}</p>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-gray-500 ">Grand Total</p>
        <p className="font-semibold">{currencyFormatter(grandTotal)}</p>
      </div>
      <Button
        onClick={handleOrderNow}
        className="w-full text-xl font-semibold py-5"
      >
        Order Now
      </Button>
    </div>
  );
}
