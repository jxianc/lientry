import React, { useState } from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import NextLink from 'next/link'
import Image from 'next/image'
import { FaUser } from 'react-icons/fa'

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

  return (
    <div className="space-y-6 px-6 py-4 rounded-[0.3rem] bg-white border border-gray-200 shadow-sm">
      <div>
        <div className="flex flex-row space-x-2 items-center">
          <div
            className="hover:cursor-pointer"
            onClick={() => setIsSaved(!isSaved)}
          >
            {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
          </div>
          <NextLink href={`/tree/${treeId}`} passHref>
            <a className="hover:underline hover:text-teal-800">
              <h2 className="font-semibold hover:font-bold text-base">
                {treeName}
              </h2>
            </a>
          </NextLink>
        </div>
        <h3 className="text-sm">{description}</h3>
      </div>
      <div className="flex flex-row justify-between">
        <NextLink
          href={`/user/${'9a31f334-b7d9-4362-8ab6-f8d667378f45'}`}
          passHref
        >
          <a className="inline-flex items-center space-x-1">
            {userImage ? (
              <Image
                alt="profile pic"
                src={userImage}
                height={20}
                width={20}
                className="rounded-full"
              />
            ) : (
              <FaUser />
            )}

            <span className="text-sm font-semibold">
              {userName || `usr${userId}`}
            </span>
          </a>
        </NextLink>
        <div className="flex flex-row text-sm space-x-4 text-gray-600">
          <div>{`${viewed} viewed`}</div>
          <div>{`${numOfLinks} links`}</div>
          <div>{createdAt}</div>
        </div>
      </div>
    </div>
  )
}
