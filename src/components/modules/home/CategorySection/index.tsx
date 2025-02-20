import MySection from '@/components/shared/MySection/MySection';
import SectionHeading from '@/components/shared/SectionHeading/SectionHeading';
import CategoryCard from '@/components/ui/core/CategoryCard';
import { getAllCategory } from '@/services/Category';
import { TCategory } from '@/types';
import React from 'react'

const CategorySection = async() => {
    const { data: categories } = await getAllCategory();
  return (
    <div>
      <MySection>
        <SectionHeading
          sectionTitle="Category"
          dLink="/all-products"
          dLinkTitle="All Products"
        />
        <div className="grid xl:grid-cols-6 xl:gap-4 lg:grid-cols-5 lg:gap-3 md:grid-cols-4 md:gap-3 grid-cols-2 gap-2">
          {categories?.slice(0, 6).map((category: TCategory, idx: number) => (
            <CategoryCard key={idx} category={category} />
          ))}
        </div>
      </MySection>
    </div>
  );
}

export default CategorySection
