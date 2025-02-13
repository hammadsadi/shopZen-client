import Footer from '@/components/shared/Footer/Footer';
import Navbar from '@/components/shared/Navbar/Navbar'
import React, { ReactNode } from 'react'

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <Navbar />
      <div className="max-w-7xl mx-auto min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout
