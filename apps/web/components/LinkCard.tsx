import React from 'react'
import NextLink from 'next/link'
import { VscCopy, VscLink, VscLinkExternal } from 'react-icons/vsc'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface LinkCardProps {}

export const LinkCard: React.FC<LinkCardProps> = ({}) => {
  return (
    <div className="space-y-2 px-6 py-4 rounded-[0.3rem] shadow-md bg-white">
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
        <h3 className="text-sm">This is the first tree in the world!</h3>
      </div>
      <div className="flex flex-row space-x-4 justify-end">
        <NextLink href="#" passHref>
          <a target="_blank">
            <VscLinkExternal size={20} className="hover:cursor-pointer" />
          </a>
        </NextLink>
        <CopyToClipboard text="asd">
          <VscCopy size={20} className="hover:cursor-pointer" />
        </CopyToClipboard>
      </div>
    </div>
  )
}
