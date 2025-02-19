import React, { ReactNode } from 'react'

const MySection = ({children}:{children:ReactNode}) => {
  return <div className="my-10 lg:my-[70px] md:px-0 px-4">{children}</div>;
}

export default MySection
