import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Dropdown, DropdownComponent, DropdownAction } from '../Dropdown'
import NextLink from 'next/link'
import Image from 'next/image'
import { TreeCardLayout } from './layouts/TreeCardLayout'

interface DashboardSavedTreeCardProps {}

export const DashboardSavedTreeCard: React.FC<
  DashboardSavedTreeCardProps
> = ({}) => {
  return (
    <TreeCardLayout>
      <div className="flex justify-between">
        <NextLink href="/#" passHref>
          <a className="hover:underline hover:text-li-green-main">
            <h2 className="font-semibold text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
              ad.
            </h2>
          </a>
        </NextLink>
        <Dropdown
          component={DropdownComponent.ICON}
          Icon={BsThreeDots}
          dropdownItems={[
            {
              title: 'Visit',
              action: DropdownAction.EXTERNAL_LINK,
              href: '/#',
            },
            {
              title: 'Remove',
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
        <div>Jun 12, 2022</div>
      </div>
    </TreeCardLayout>
  )
}
