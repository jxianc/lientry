import React from 'react'

interface ContainerProps {
  children?: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="bg-white min-h-screen max-w-7xl mx-auto w-full">
      <div className="flex flex-col justify-center">
        <main>{children}</main>
      </div>
    </div>
  )
}
