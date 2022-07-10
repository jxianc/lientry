import NextLink from 'next/link'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { VscCopy } from 'react-icons/vsc'
import { cn } from '../../lib/classname'
import { LinkCardLayout } from './layouts/LinkCardLayout'

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
          <LinkCardLayout isClickable={true}>
            <div className="flex flex-row space-x-2 items-start justify-between">
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
              <div
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
          </LinkCardLayout>
        </a>
      </NextLink>
    </div>
  )
}
