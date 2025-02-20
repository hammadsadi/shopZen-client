import AllProducts from '@/components/modules/product';
import ProductBanner from '@/components/modules/product/banner';
import { Button } from '@/components/ui/button';
import CategoryCard from '@/components/ui/core/CategoryCard';
import { getAllCategory } from '@/services/Category';
import { getAllProducts } from '@/services/Product';
import { TCategory } from '@/types';
import React from 'react'

const AllProductPage = async () => {
    const { data:categories} = await getAllCategory();
    const { data:products } = await getAllProducts();
  return (
    <div>
      <div>
        <ProductBanner title="All Producs" path="Home - Shop" />
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="flex justify-between items-center my-5 md:my-6 lg:my-7">
            <h3 className="font-bold text-lg md:text-2xl">
              Featured Collection
            </h3>
            <div className="space-x-1 md:space-x-3">
              <Button size="sm" variant="outline">
                Previous
              </Button>
              <Button size="sm" variant="default">
                Next
              </Button>
            </div>
          </div>
          <div className="grid xl:grid-cols-6 xl:gap-4 lg:grid-cols-5 lg:gap-3 md:grid-cols-4 md:gap-3 grid-cols-2 gap-2">
            {categories?.slice(0, 6).map((category: TCategory, idx: number) => (
              <CategoryCard key={idx} category={category} />
            ))}
          </div>
          {/* Products and Sidebar Here */}
          <AllProducts products={products} />
        </div>
      </div>
    </div>
  );
}

export default AllProductPage
