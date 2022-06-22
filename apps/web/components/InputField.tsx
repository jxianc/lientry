import { useField } from 'formik'
import React, { HTMLInputTypeAttribute } from 'react'

export interface InputFieldProps {
  label: string
  name: string
  type: HTMLInputTypeAttribute
  placeholder: string
  required: boolean
  autoComplete?: string
  helperText?: string | string[]
}

// these are from Formik
interface FieldAndForm {
  field?: any
  form?: any
}

export const InputField: React.FC<InputFieldProps & FieldAndForm> = ({
  field: fieldFromProps,
  form,
  label,
  helperText,
  ...props
}) => {
  const [field, meta] = useField({ ...fieldFromProps, ...props })

  return (
    <div className="">
      <label htmlFor="email-address" className="px-2 text-sm">
        {label}
      </label>
      <input
        {...field}
        {...props}
        className="my-1 w-full px-3 py-2 dark:bg-li-gray-1400 border border-li-gray-400 dark:border-li-gray-1100 placeholder-li-gray-700 focus:outline-none focus:border-li-green-main dark:focus:border-li-green-main focus:z-10 text-xs md:text-sm rounded-[0.3rem]"
      />
      <div className="px-2 text-gray-600">
        {helperText && Array.isArray(helperText) ? (
          <ul className="list-disc list-inside">
            {helperText.map((t, idx) => (
              <li key={idx}>{t}</li>
            ))}
          </ul>
        ) : (
          <div>{helperText}</div>
        )}
        {meta.error && meta.touched && (
          <div className="py-1 font-semibold text-red-500">{meta.error}</div>
        )}
      </div>
    </div>
  )
}
