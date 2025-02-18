import React from 'react'
import CreateCategoryModal from './CreateCategoryModal';

const ManageCategory = () => {
  return <div>
    <div className='flex justify-between items-center'>
        <h2 className='font-bold md:text-2xl text-xl'>Manage Categories</h2>
        <CreateCategoryModal/>
    </div>
  </div>;
}

export default ManageCategory
