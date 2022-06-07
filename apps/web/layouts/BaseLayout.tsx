import React from 'react'
import { Navbar } from '../components/Navbar'
import { cn } from '../lib/classname'

interface BaseLayoutProps {
  children?: React.ReactNode
  isMain?: boolean
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children, isMain }) => {
  return (
    <div className="bg-white">
      {isMain && <Navbar />}
      <div
        className={cn(
          isMain ? 'max-w-5xl' : 'max-w-7xl',
          'mx-auto w-full min-h-screen',
        )}
      >
        <div className="flex flex-col justify-center">
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}
