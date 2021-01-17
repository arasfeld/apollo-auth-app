import React from 'react'

enum ButtonColor {
  Primary = 'primary',
  Accent = 'accent'
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor
}

export const Button: React.FC<Props> = ({ children, ...rest }) => (
  <button
    className="px-8 py-2 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:ring focus:outline-none"
    {...rest}
  >
    {children}
  </button>
)
