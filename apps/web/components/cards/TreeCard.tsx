import React, { useState } from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import NextLink from 'next/link'
import Image from 'next/image'
import { formatDate } from '../../lib/date'
import { useRouter } from 'next/router'
import { TreeCardLayout } from './layouts/TreeCardLayout'
import { IoLink, IoEye } from 'react-icons/io5'
import { StatsBadge } from '../badges/StatsBadge'
import { Badge } from '../badges/Badge'

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
  isPublic: boolean
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
  isPublic,
}) => {
  const [isSaved, setIsSaved] = useState(false)
  const router = useRouter()

  const isTreePage = () => {
    return router.pathname.includes('tree')
  }

  return (
    <TreeCardLayout>
      <div>
        <div className="flex flex-row space-x-2 items-start">
          <div
            className="hover:cursor-pointer mt-1"
            onClick={() => setIsSaved(!isSaved)}
          >
            {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
          </div>
          <div className="flex flex-col items-start">
            <div className="flex flex-nowrap items-center gap-2">
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
            <h3 className="text-sm text-li-gray-1100 dark:text-li-gray-700 mb-2">
              {description}
            </h3>
            {!isPublic && <Badge text="private" />}
          </div>
        </div>
        <div className="flex flex-row justify-between mt-4">
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
            <Badge text={formatDate(createdAt)} />
          </div>
        </div>
      </div>
    </TreeCardLayout>
  )
}
