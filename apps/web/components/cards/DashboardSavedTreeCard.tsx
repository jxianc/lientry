import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Dropdown, DropdownComponent, DropdownAction } from '../Dropdown'
import NextLink from 'next/link'
import Image from 'next/image'

interface DashboardSavedTreeCardProps {}

export const DashboardSavedTreeCard: React.FC<
  DashboardSavedTreeCardProps
> = ({}) => {
  return (
    <div className="p-4 bg-white border border-gray-300 rounded-[0.3rem] shadow-sm">
      <div className="flex justify-between">
        <NextLink href="/#" passHref>
          <a className="font-medium hover:underline">
            Lorem ipsum dolor sit amet.
          </a>
        </NextLink>
        <Dropdown
          component={DropdownComponent.ICON}
          Icon={BsThreeDots}
          dropdownItems={[
            {
              title: 'Go',
              action: DropdownAction.EXTERNAL_LINK,
              href: '/#',
            },
            {
              title: 'Unsave',
              action: DropdownAction.BUTTON,
              clickHandler: async () => {
                console.log('clicked dropdown')
              },
            },
          ]}
        />
      </div>
      <div className="flex space-x-4 text-sm mt-2">
        <NextLink
          href={`/user/${'9a31f334-b7d9-4362-8ab6-f8d667378f45'}`}
          passHref
        >
          <a className="inline-flex items-center space-x-1">
            <Image
              alt="profile pic"
              src="https://avatars.githubusercontent.com/u/62977699?v=4"
              height={20}
              width={20}
              className="rounded-full"
            />
            <span className="text-sm font-semibold">usr991476720845679</span>
          </a>
        </NextLink>
        <div>11 links</div>
        <div>18590 views</div>
        <div className="flex space-x-1">
          <span className="italic text-gray-600">created at</span>
          <span className="font-semibold">Jun 12, 2022</span>
        </div>
      </div>
    </div>
  )
}
