import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const TextField: React.FC<Props> = ({ label, ...rest }) => (
  <label className="text-sm leading-7 text-gray-600">
      {label}
      <input
        className="w-full px-4 py-2 mb-4 mr-4 text-base bg-gray-100 border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:ring-0"
        type="text"
        {...rest}
      />
    </label>
)
