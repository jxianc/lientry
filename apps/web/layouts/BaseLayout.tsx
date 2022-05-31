import React from 'react'

interface BaseLayoutProps {
  children?: React.ReactNode
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="bg-white min-h-screen max-w-7xl mx-auto w-full">
      <div className="flex flex-col justify-center">
        <main>{children}</main>
      </div>
    </div>
  )
}
