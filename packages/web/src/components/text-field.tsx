import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const TextField: React.FC<Props> = ({ label, ...rest }) => (
  <label className="text-sm leading-7 text-gray-700 dark:text-gray-400">
      {label}
      <input
        className="w-full px-4 py-2 mb-4 mr-4 bg-gray-100 dark:bg-gray-800 border-transparent rounded-lg text-base focus:ring-0"
        type="text"
        {...rest}
      />
    </label>
)
