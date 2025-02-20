import ProductBanner from '@/components/modules/product/banner';
import ProductDetgails from '@/components/modules/product/productDetails';
import MySection from '@/components/shared/MySection/MySection';
import { getSingleProduct } from '@/services/Product';
import React from 'react'

const ProductDetailsPage =async ({params}:{params:Promise<{productId:string}>}) => {
    const { productId } = await params;
    const {data:product} = await getSingleProduct(productId)
  return (
    <div>
      <ProductBanner
        title="Product Details"
        path="Home - Products - Product Details"
      />
      <MySection>
        <ProductDetgails product={product} />
      </MySection>
    </div>
  );
}

export default ProductDetailsPage
