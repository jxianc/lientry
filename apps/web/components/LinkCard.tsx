import NextLink from 'next/link'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { VscCopy, VscLink } from 'react-icons/vsc'

interface LinkCardProps {
  title: string
  description?: string | null
  url: string
}

export const LinkCard: React.FC<LinkCardProps> = ({
  title,
  description,
  url,
}) => {
  return (
    <div className="space-y-2 px-6 py-4 w-[96%] ml-auto rounded-[0.3rem] bg-white border border-gray-200 shadow-sm">
      <div className="flex flex-row justify-between space-x-2">
        <div className="flex flex-row space-x-2 items-start">
          <VscLink size={20} />
          <div className="">
            <NextLink href={url} passHref>
              <a
                className="hover:underline hover:text-teal-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h5 className="font-semibold text-base leading-tight">
                  {title}
                </h5>
              </a>
            </NextLink>
            {description && <h3 className="text-sm">{description}</h3>}
          </div>
        </div>
        <div>
          <CopyToClipboard text={url}>
            <button className="bg-white hover:bg-gray-200 text-sm px-1 rounded-md text-gray-500 hover:text-gray-600 border border-gray-300 hover:border-gray-600 inline-flex items-center">
              <VscCopy size={14} className="hover:cursor-pointer" />
              <span>copy</span>
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  )
}
