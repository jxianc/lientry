import React, { useState } from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import NextLink from 'next/link'
import Image from 'next/image'
import { formatDate } from '../../lib/date'
import { useRouter } from 'next/router'
import { TreeCardLayout } from './TreeCardLayout'
import { IoLink, IoEye } from 'react-icons/io5'
import { IconType } from 'react-icons/lib'

// stats badge component
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

// tree card component (main)

interface TreeCardProps {
  treeId: string
  treeName: string
  description?: string | null
  userId: string
  userName?: string | null
  userImage?: string | null
  viewed: number
  numOfLinks: number
  createdAt: string
}

export const TreeCard: React.FC<TreeCardProps> = ({
  treeId,
  treeName,
  description,
  userId,
  userName,
  userImage,
  viewed,
  numOfLinks,
  createdAt,
}) => {
  const [isSaved, setIsSaved] = useState(false)
  const router = useRouter()

  const isTreePage = () => {
    return router.pathname.includes('tree')
  }

  return (
    <TreeCardLayout>
      <div>
        <div className="flex flex-row space-x-2 items-center">
          <div
            className="hover:cursor-pointer"
            onClick={() => setIsSaved(!isSaved)}
          >
            {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
          </div>
          {isTreePage() ? (
            <h2 className="font-semibold text-base">{treeName}</h2>
          ) : (
            <NextLink href={`/tree/${treeId}`} passHref>
              <a className="hover:underline hover:text-li-green-main">
                <h2 className="font-semibold text-base">{treeName}</h2>
              </a>
            </NextLink>
          )}
        </div>
        <h3 className="text-sm text-li-gray-1100 dark:text-li-gray-700">
          {description}
        </h3>
      </div>
      <div className="flex flex-row justify-between">
        <NextLink
          href={`/user/${'9a31f334-b7d9-4362-8ab6-f8d667378f45'}`}
          passHref
        >
          <a className="inline-flex items-center space-x-2">
            <Image
              alt="profile pic"
              src={
                userImage ||
                'https://avatars.githubusercontent.com/u/62977699?v=4'
                // TODO replace default profile picture
              }
              height={20}
              width={20}
              className="rounded-full"
            />
            <span className="text-sm font-semibold">
              {userName || `usr${userId}`}
            </span>
          </a>
        </NextLink>
        <div className="flex flex-row text-sm space-x-4 text-li-gray-1100 dark:text-li-gray-700">
          <StatsBadge label="views" count={viewed} Icon={IoEye} />
          <StatsBadge label="links" count={numOfLinks} Icon={IoLink} />
          <DateBadge date={formatDate(createdAt)} />
        </div>
      </div>
    </TreeCardLayout>
  )
}
