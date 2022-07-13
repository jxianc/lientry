import { useField } from 'formik'
import React, { HTMLInputTypeAttribute } from 'react'

interface ToggleButtonInputProps {
  label: string
  name: string
  type: HTMLInputTypeAttribute
  placeholder: string
  required: boolean
}

// these are from Formik
interface FieldAndForm {
  field?: any
  form?: any
}

export const ToggleButtonInput: React.FC<ToggleButtonInputProps> = ({
  label,
  name,
  ...props
}) => {
  const [field] = useField(name)

  return (
    <label className="relative flex space-x-4 items-center group px-2 text-sm">
      {label}
      <input
        {...field}
        {...props}
        checked={field.value}
        className="absolute w-full h-full peer appearance-none"
      />
      <span className="w-10 h-6 flex items-center flex-shrink-0 p-1 bg-li-gray-200 dark:bg-li-gray-1200 rounded-full duration-300 ease-in-out dark:peer-checked:bg-li-green-btn-hov peer-checked:bg-li-green-btn after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4"></span>
    </label>
  )
}
