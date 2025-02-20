import { TProduct } from '@/types'
import Image from 'next/image';
import React from 'react'

const ProductDetgails = ({product}:{product:TProduct}) => {
  return (
    <div className="bg-white/70 rounded-3xl grid grid-cols-2 gap-4 p-4">
      <div>
        <Image src={product?.imageUrls[0]} alt={product?.name} width={500} height={500} />
      </div>
      <div>Detagils</div>
    </div>
  );
}

export default ProductDetgails
