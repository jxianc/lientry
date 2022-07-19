import React from 'react'
import { MdClose, MdError } from 'react-icons/md'
import { ErrorAlert } from '../lib/atom/error-alerts.atom'

interface ErroAlertProps {
  message: string
}

export const ErroAlert: React.FC<ErroAlertProps> = ({ message }) => {
  return (
    <div className="fixed bg-red-500 p-2 rounded-[0.3rem] w-[36rem] flex justify-between items-center">
      <div className="flex items-center space-x-1">
        <MdError />
        <div className="text-sm">
          <div>{message}</div>
        </div>
      </div>
      <button>
        <MdClose />
      </button>
    </div>
  )
}

interface ErrorAlertProps {
  errors: ErrorAlert[]
}

export const ErrorAlerts: React.FC<ErrorAlertProps> = ({ errors }) => {
  return (
    <div className="flex justify-center">
      {errors.map((error, idx) => (
        <ErroAlert key={idx} message={error.message} />
      ))}
    </div>
  )
}
