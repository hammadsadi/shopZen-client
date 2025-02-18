import ManageBrand from '@/components/modules/shop/brand'
import { getAllBrand } from "@/services/Brand";
import React from 'react'

const ProductBrands = async () => {
  const { data } = await getAllBrand();
  return (
    <div>
      <ManageBrand brands={data} />
    </div>
  );
};

export default ProductBrands
