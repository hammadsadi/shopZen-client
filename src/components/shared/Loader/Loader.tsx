import { LoaderCircle } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <LoaderCircle className='animate-spin text-primary' size={40}/>
    </div>
  )
}

export default Loader
