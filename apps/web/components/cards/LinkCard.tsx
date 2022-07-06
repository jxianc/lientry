import NextLink from 'next/link'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { VscCopy } from 'react-icons/vsc'
import { cn } from '../../lib/classname'

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
    <div className="relative">
      <NextLink href={url} passHref>
        <a target="_blank" rel="noopener noreferrer">
          <div className="h-full space-y-6 p-4 w-full ml-auto rounded-[0.3rem] bg-li-gray-100 dark:bg-li-gray-1400 hover:bg-li-gray-200 dark:hover:bg-li-gray-1300 border border-li-gray-200 dark:border-li-gray-1300">
            <div className="flex space-x-2 items-start mb-10">
              <div className="space-y-2">
                <h5 className="font-semibold text-base leading-tight">
                  <span>{title}</span>
                </h5>
                {description && (
                  <h3 className="text-sm text-li-gray-1100 dark:text-li-gray-700">
                    {description}
                  </h3>
                )}
              </div>
            </div>
          </div>
        </a>
      </NextLink>
      <div
        className="absolute bottom-4 right-4"
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        <CopyToClipboard text={url}>
          <button
            className={cn(
              'text-li-gray-1100 border-li-gray-400 hover:border-li-green-main hover:text-li-green-main',
              'dark:text-li-gray-700 dark:border-li-gray-1100 dark:hover:border-li-green-main dark:hover:text-li-green-main',
              'text-sm px-1 rounded-[0.2rem] border flex items-center text-center justify-center space-x-0.5',
            )}
          >
            <VscCopy size={14} className="hover:cursor-pointer" />
            <span>copy</span>
          </button>
        </CopyToClipboard>
      </div>
    </div>
  )
}
