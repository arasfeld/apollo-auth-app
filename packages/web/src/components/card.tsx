import React from 'react'

export const Card: React.FC = ({ children, ...rest }) => (
  <div
    className="flex flex-col w-full p-8 mx-auto mt-10 border rounded-lg lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0"
    {...rest}
  >
    {children}
  </div>
)
