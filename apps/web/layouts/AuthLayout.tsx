import React from 'react'
import { BaseLayout } from './BaseLayout'

interface AuthLayoutProps {
  children?: React.ReactNode
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <BaseLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x">
        <div className="flex flex-col lg:space-y-2 text-center items-center justify-center lg:min-h-screen p-4">
          <h1 className="text-lg md:text-2xl lg:text-4xl font-bold">Lientry</h1>
          <h2 className="text-xs md:text-sm lg:text-lg font-semibold">
            A place to store your links and share it to other people
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center text-center lg:min-h-screen p-4">
          {children}
        </div>
      </div>
    </BaseLayout>
  )
}
