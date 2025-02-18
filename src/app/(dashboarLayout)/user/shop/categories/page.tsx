import ManageCategory from '@/components/modules/shop/categories';
import { getAllCategory } from "@/services/Category";
import React from 'react'

const ProductCategoriesPage = async () => {
  const { data } = await getAllCategory();
  return (
    <div>
      <ManageCategory categories={data} />
    </div>
  );
};

export default ProductCategoriesPage
