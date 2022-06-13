import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Dropdown, DropdownAction, DropdownComponent } from '../Dropdown'
import NextLink from 'next/link'

interface DashboardCreatedTreeCardProps {}

export const DashboardCreatedTreeCard: React.FC<
  DashboardCreatedTreeCardProps
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
              title: 'Edit',
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
      <div className="flex space-x-4 text-sm mt-4">
        <div>11 links</div>
        <div>18590 views</div>
        <div className="flex space-x-1">
          <span className="italic text-gray-600">created at</span>
          <span className="font-semibold">Jun 12, 2022</span>
        </div>
        <div className="flex space-x-1">
          <span className="italic text-gray-600">updated at</span>
          <span className="font-semibold">Jun 12, 2022</span>
        </div>
      </div>
    </div>
  )
}
