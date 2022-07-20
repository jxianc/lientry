import { useAtom } from 'jotai'
import React from 'react'
import { MdClose, MdError } from 'react-icons/md'
import { ErrorAlert, setErrorAlertsAtom } from '../lib/atom/error-alerts.atom'

interface ErroAlertProps {
  message: string
  index: number
}

export const ErroAlert: React.FC<ErroAlertProps> = ({ message, index }) => {
  // jotai
  const [errorAlerts, setErrorAlerts] = useAtom(setErrorAlertsAtom)

  return (
    <div className="text-white bg-red-500 p-2 rounded-[0.3rem] flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-1">
        <MdError />
        <div className="text-sm">
          <div>{message}</div>
        </div>
      </div>
      <button
        onClick={() => {
          setErrorAlerts(errorAlerts.filter((error) => error.index !== index))
        }}
      >
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
      <div className="fixed w-[36rem] space-y-4">
        {errors.map((error) => (
          <ErroAlert
            key={error.index}
            message={error.message}
            index={error.index}
          />
        ))}
      </div>
    </div>
  )
}
