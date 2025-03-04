import MySection from '@/components/shared/MySection/MySection';
import SectionHeading from '@/components/shared/SectionHeading/SectionHeading';
import ProductCard from '@/components/ui/core/ProductCard';
import { getAllProducts } from '@/services/Product';
import { TProduct } from '@/types';
import React from 'react'

const FeaturesProducts = async() => {
  const {data:products} = await getAllProducts()
  return (
    <div className="bg-white">
      <MySection>
        <div className="py-10 lg:py-[70px]">
          <SectionHeading
            sectionTitle="Featured Products"
            dLink="/products"
            dLinkTitle="All Collection"
          />
          <div className="grid xl:grid-cols-4 xl:gap-5 lg:grid-cols-3 lg:gap-3 md:grid-cols-2 md:gap-3 grid-cols-1 gap-2">
            {products?.slice(0, 4)?.map((product: TProduct, idx: number) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        </div>
      </MySection>
    </div>
  );
}

export default FeaturesProducts
