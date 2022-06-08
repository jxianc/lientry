import React from 'react'
import { Navbar } from '../components/Navbar'

interface MainLayoutProps {
  children?: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="max-w-5xl mx-auto w-full min-h-screen">
        <div className="flex flex-col justify-center">
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}
