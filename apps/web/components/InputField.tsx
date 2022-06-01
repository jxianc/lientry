import { useField } from 'formik'
import React, { HTMLInputTypeAttribute } from 'react'
import { cn } from '../lib/classname'

export interface InputFieldProps {
  label: string
  name: string
  type: HTMLInputTypeAttribute
  placeholder: string
  required: boolean
  autoComplete?: string
  isEdge?: 'top' | 'bottom'
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  isEdge,
  ...props
}) => {
  const [field] = useField(props)

  return (
    <div>
      <label htmlFor="email-address" className="sr-only">
        {label}
      </label>
      <input
        {...field}
        {...props}
        className={cn(
          'relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:z-10 text-xs md:text-sm',
          isEdge ? (isEdge === 'top' ? 'rounded-t-md' : 'rounded-b-md') : '',
        )}
      />
    </div>
  )
}
