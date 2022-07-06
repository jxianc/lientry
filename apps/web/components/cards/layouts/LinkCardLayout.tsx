import React from 'react'
import { cn } from '../../../lib/classname'

interface LinkCardLayoutProps {
  children?: React.ReactNode
  isClickable: boolean
}

export const LinkCardLayout: React.FC<LinkCardLayoutProps> = ({
  children,
  isClickable,
}) => {
  return (
    <div
      className={cn(
        'h-full space-y-6 p-4 w-full ml-auto rounded-[0.3rem] bg-li-gray-100 dark:bg-li-gray-1400 border border-li-gray-200 dark:border-li-gray-1300',
        isClickable ? 'hover:bg-li-gray-200 dark:hover:bg-li-gray-1300' : '',
      )}
    >
      {children}
    </div>
  )
}
