import React, { useState } from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import NextLink from 'next/link'

interface TreeCardProps {}

export const TreeCard: React.FC<TreeCardProps> = ({}) => {
  const [isSaved, setIsSaved] = useState(false)

  return (
    <div className="space-y-6 px-6 py-4 rounded-sm bg-gray-100 shadow-md">
      <div>
        <div className="flex flex-row space-x-2 items-center">
          <div
            className="hover:cursor-pointer"
            onClick={() => setIsSaved(!isSaved)}
          >
            {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
          </div>
          <NextLink href="#" passHref>
            <a className="hover:underline hover:text-teal-800">
              <h2 className="font-semibold hover:font-bold text-base">
                First treeeee
              </h2>
            </a>
          </NextLink>
        </div>
        <h3 className="text-sm">This is the first tree in the world!</h3>
      </div>
      <div className="flex flex-row justify-between">
        <NextLink href="#" passHref>
          <button className="bg-zinc-200 hover:bg-zinc-300 px-2 py-0.5 shadow-sm shadow-gray-400 rounded-[0.2rem] text-sm font-medium">
            usr991476720845679
          </button>
        </NextLink>
        <div className="flex flex-row text-sm space-x-4 text-gray-600">
          <div>69427 viewed</div>
          <div>7 links</div>
          <div>Jun 8, 2022</div>
        </div>
      </div>
    </div>
  )
}
