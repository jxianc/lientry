import React from 'react'

interface TreeCardLayoutProps {
  children?: React.ReactNode
}

export const TreeCardLayout: React.FC<TreeCardLayoutProps> = ({ children }) => {
  return (
    <div className="space-y-4 p-4 rounded-[0.3rem] bg-li-gray-100 dark:bg-li-gray-1400">
      {children}
    </div>
  )
}
