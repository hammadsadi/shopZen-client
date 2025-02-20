import { Button } from "@/components/ui/button";
import { TProduct } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProductDetgails = ({ product }: { product: TProduct }) => {
  return (
    <div className="border rounded-3xl grid grid-cols-2 gap-4 p-4">
      <div>
        <Image
          src={product?.imageUrls[0]}
          alt={product?.name}
          width={500}
          height={500}
          className="rounded-md w-full object-cover h-80"
        />
        <div className="grid grid-cols-3 gap-4 mt-2">
          {product?.imageUrls?.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={product?.name}
              width={100}
              height={100}
              className="rounded-md w-full object-cover h-20"
            />
          ))}
        </div>
      </div>
      <div className="bg-white rounded-md p-4">
        <h2 className="font-bold text-xl mb-4">{product?.name}</h2>
        <p className="text-justify text-gray-500 font-light text-sm">
          {product?.description}
        </p>
        <div className="flex items-center justify-between my-5 text-gray-500 text-xs">
          <p className="rounded-full px-4 py-1 bg-gray-100 flex items-center justify-center gap-1">
            <Star className="w-4 h-4" fill="orange" stroke="orange" />
            {product?.averageRating} Ratings
          </p>
          <p className="rounded-full px-4 py-1 bg-gray-100">
            Stock: {product?.stock}
          </p>
          <p className="rounded-full px-4 py-1 bg-gray-100">
            Brand: {product?.brand?.name}
          </p>
          <p className="rounded-full px-4 py-1 bg-gray-100">
            Category: {product?.category?.name}
          </p>
        </div>
        <hr />
        <p className="my-2 font-bold">
          Price:{" "}
          {product?.offerPrice ? (
            <>
              <span className="font-semibold mr-2 text-orange-400">
                $ {product?.offerPrice}
              </span>
              <del className="font-semibold text-xs">$ {product?.price}</del>
            </>
          ) : (
            <span className="font-semibold">$ {product?.price}</span>
          )}
        </p>
        <hr />

        <Button variant="outline" className="w-full my-5">
          Add To Cart
        </Button>
        <Button className="w-full">Buy Now</Button>
      </div>
    </div>
  );
};

export default ProductDetgails;
