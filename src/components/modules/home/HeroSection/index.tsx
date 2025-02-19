import React from "react";
import style from "./HeroSection.module.css";
import { Button } from "@/components/ui/button";
import headPhone from "@/assets/images/cup-with-headphone.png";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div
      className={`${style.banner} mt-5 min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center`}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10 relative z-10">
        {/* Text Section */}
        <div className="p-4 md:pl-12 space-y-4">
          <h2 className="font-bold text-2xl md:text-4xl lg:text-5xl leading-tight">
            Don&apos;t miss out on <br /> These Unbeatable Black <br /> Friday
            Deals!
          </h2>
          <p className="">
            Save big this Black Friday with our unbeatable deals on tech, home
            essentials, fashion, and more! Limited stock.
          </p>
          <div className="flex gap-4">
            <Button>
              Buy Now
            </Button>
            <Button
              variant="outline"
              
            >
              All Products
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center">
          <Image
            src={headPhone}
            alt="Headphone Cup"
            className="w-full h-auto max-w-[400px] md:max-w-[500px]"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
