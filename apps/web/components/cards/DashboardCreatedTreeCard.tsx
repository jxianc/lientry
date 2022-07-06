import React from 'react'
import { TreeCardLayout } from './layouts/TreeCardLayout'
import NextLink from 'next/link'
import { Dropdown, DropdownAction, DropdownComponent } from '../Dropdown'
import { BsThreeDots } from 'react-icons/bs'

interface DashboardCreatedTreeCardProps {}

export const DashboardCreatedTreeCard: React.FC<
  DashboardCreatedTreeCardProps
> = () => {
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
      <div className="flex space-x-4 text-sm">
        <div>11 links</div>
        <div>18590 views</div>
        <div>Jun 20, 2022</div>
      </div>
    </TreeCardLayout>
  )
}
