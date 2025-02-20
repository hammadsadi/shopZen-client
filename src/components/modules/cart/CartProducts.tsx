import Image from "next/image";
import emptyCart from "@/assets/images/empty-cart.png";
import { getAllProducts } from "@/services/Product";
import CartProductCard from "./CartProductCard";
import { TProduct } from "@/types";
export default async function CartProducts() {
  const { data: products } = await getAllProducts();

  return (
    <div className=" border rounded-md lg:col-span-8 h-full row-span-3 p-10 space-y-5">
      {products.length === 0 && (
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="mt-2">
            Looks like your cart is on vacation—bring it back to work by adding
            some items!
          </p>
          <div className="flex justify-center items-center ">
            <Image src={emptyCart} alt="empty cart" />
          </div>
        </div>
      )}
      {products.map((product: TProduct) => (
        <CartProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
