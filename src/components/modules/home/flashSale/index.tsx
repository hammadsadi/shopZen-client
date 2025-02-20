import MySection from "@/components/shared/MySection/MySection";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/core/ProductCard";
import { getAllFlashSaleProducts } from "@/services/FlashSale";
import { TProduct } from "@/types";
import Link from "next/link";
import React from "react";
import CountDown from "./CountDown";

const FlashSaleProducts = async () => {
  const { data: products } = await getAllFlashSaleProducts();
  return (
    <div className="bg-white">
      <MySection>
        <div className="py-10 lg:py-[70px]">
          <div className="flex md:flex-row flex-col justify-between items-center mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
              <h2 className="text-xl font-bold md:text-3xl">Flash Sale</h2>
              <CountDown />
            </div>
            <Link href="/all-products" className="hidden md:block">
              <Button variant="outline">All Collection</Button>
            </Link>
          </div>

          <div className="grid xl:grid-cols-4 xl:gap-5 lg:grid-cols-3 lg:gap-3 md:grid-cols-2 md:gap-3 grid-cols-1 gap-2">
            {products?.slice(0, 4)?.map((product: TProduct, idx: number) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        </div>
      </MySection>
    </div>
  );
};

export default FlashSaleProducts;
