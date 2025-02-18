import ManageProducts from '@/components/modules/shop/product'
import { getAllProducts } from '@/services/Product'
import React from 'react'

const ManageProductsPage = async() => {
    const {data} = await getAllProducts()
  return (
    <div>
      <ManageProducts products ={data}/>
    </div>
  );
}

export default ManageProductsPage
