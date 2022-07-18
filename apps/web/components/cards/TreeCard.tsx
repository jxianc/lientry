import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { IoEye, IoLink } from 'react-icons/io5'
import {
  useSaveTreeMutation,
  useUnsaveTreeMutation,
} from '../../generated/graphql'
import { formatDate } from '../../lib/date'
import { Badge } from '../badges/Badge'
import { StatsBadge } from '../badges/StatsBadge'
import { TreeCardLayout } from './layouts/TreeCardLayout'

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
  isSaved?: boolean
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
  isSaved: isSavedFromProps,
}) => {
  // useState
  const [isSaved, setIsSaved] = useState(isSavedFromProps)

  // mutation
  const [_, execSaveTree] = useSaveTreeMutation()
  const [__, execUnsaveTree] = useUnsaveTreeMutation()

  // router
  const router = useRouter()

  // helpers
  const isTreePage = () => {
    return router.pathname.includes('tree')
  }

  return (
    <TreeCardLayout>
      <div>
        <div className="flex flex-row space-x-2 items-start">
          <div
            className="hover:cursor-pointer mt-1"
            onClick={async () => {
              if (isSaved) {
                // tree is saved, unsave it
                const { data, error } = await execUnsaveTree({
                  treeId,
                })
                if (error) {
                  // TODO handle error here
                }

                if (data?.unsaveTree.success) {
                  setIsSaved(!isSaved)
                }
              } else {
                // tree is not saved, save it
                const { data, error } = await execSaveTree({
                  treeId,
                })

                if (error) {
                  // TODO handle error here
                }

                if (data?.saveTree.success) {
                  setIsSaved(!isSaved)
                }
              }
            }}
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
