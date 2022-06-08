import React from 'react'
import { Navbar } from '../components/Navbar'

interface BaseLayoutProps {
  children?: React.ReactNode
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full min-h-screen">
        <div className="flex flex-col justify-center">
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}
