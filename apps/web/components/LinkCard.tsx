import NextLink from 'next/link'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { VscCopy, VscLink, VscLinkExternal } from 'react-icons/vsc'
import { iconButtonStyles } from './IconButton'

interface LinkCardProps {}

export const LinkCard: React.FC<LinkCardProps> = ({}) => {
  return (
    <div className="space-y-2 px-6 py-4 w-[96%] ml-auto rounded-[0.3rem] bg-white border border-gray-200 shadow-sm">
      <div>
        <div className="flex flex-row space-x-2 items-center">
          <VscLink size={20} />
          <NextLink href={`/tree/${'cl42mzxxe0009radfgeoqd6h3'}`} passHref>
            <a className="hover:underline hover:text-teal-800">
              <h5 className="font-semibold hover:font-bold text-base">
                My GitHub profile
              </h5>
            </a>
          </NextLink>
        </div>
        <h3 className="text-sm">This is the first link in the world!</h3>
      </div>
      <div className="flex flex-row space-x-2 justify-end">
        <NextLink href="#" passHref>
          <a target="_blank" className={iconButtonStyles}>
            <VscLinkExternal size={18} className="hover:cursor-pointer" />
          </a>
        </NextLink>
        <CopyToClipboard text="asd">
          <button className={iconButtonStyles}>
            <VscCopy size={18} className="hover:cursor-pointer" />
          </button>
        </CopyToClipboard>
      </div>
    </div>
  )
}
