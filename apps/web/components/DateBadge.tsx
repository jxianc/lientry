interface DateBadgeProps {
  date: string
}

export const DateBadge: React.FC<DateBadgeProps> = ({ date }) => {
  return (
    <div className="flex px-1 text-center items-center justify-center border border-li-gray-600 dark:border-li-gray-900 rounded-[0.2rem] text-xs overflow-hidden">
      {date}
    </div>
  )
}
