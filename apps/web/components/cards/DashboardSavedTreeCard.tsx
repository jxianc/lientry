import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Dropdown, DropdownComponent, DropdownAction } from '../Dropdown'
import NextLink from 'next/link'

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
      <div className="text-sm">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
        explicabo quas, unde veniam error neque exercitationem voluptate optio
        debitis nam?
      </div>
      <div className="flex space-x-4 text-sm mt-4">
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
