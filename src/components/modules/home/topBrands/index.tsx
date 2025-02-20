import MySection from "@/components/shared/MySection/MySection";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { getAllBrand } from "@/services/Brand";
import { TBrand } from "@/types/brand.types";
import Image from "next/image";
import React from "react";

const TopBrandsSection = async () => {
  const { data: brands } = await getAllBrand();
  return (
    <div className="">
      <MySection>
        <div className="">
          <SectionHeading
            sectionTitle="Top Brands"
            dLink="/all-products"
            dLinkTitle="All Collection"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {brands?.slice(0, 8)?.map((brand: TBrand, idx: number) => (
              <div className="bg-white p-3 rounded-xl" key={idx}>
                <div className="bg-gray-100 hover:bg-gray-300 p-2 rounded-xl h-20 w-full">
                  <Image
                    src={brand?.logo}
                    width={50}
                    height={50}
                    alt="category icon"
                    className="mx-auto h-full w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </MySection>
    </div>
  );
};

export default TopBrandsSection;
