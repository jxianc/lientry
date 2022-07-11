import React from 'react'
import { IconType } from 'react-icons'

interface StatsBadgeProps {
  label: string
  count: number
  Icon: IconType
}

export const StatsBadge: React.FC<StatsBadgeProps> = ({
  label,
  count,
  Icon,
}) => {
  return (
    <div className="flex divide-x divide-li-gray-400 dark:divide-li-gray-1200 border border-li-gray-600 dark:border-li-gray-900 rounded-[0.2rem] text-xs overflow-hidden">
      <div className="flex space-x-1 justify-center text-center items-center px-1 bg-li-gray-200 dark:bg-li-gray-1200 dark:text-li-gray-500 text-li-gray-1100">
        <Icon />
        <span>{label}</span>
      </div>
      <div className="text-center justify-center items-center flex px-1">
        {count}
      </div>
    </div>
  )
}
