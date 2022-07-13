import React, { useState } from 'react'
import { TreeCardLayout } from './layouts/TreeCardLayout'
import NextLink from 'next/link'
import { Dropdown, DropdownAction, DropdownComponent } from '../Dropdown'
import { StatsBadge } from '../StatsBadge'
import { DateBadge } from '../DateBadge'
import { IoEye, IoLink } from 'react-icons/io5'
import { FiMoreVertical } from 'react-icons/fi'
import { formatDate } from '../../lib/date'
import { useRouter } from 'next/router'
import { DeleteTreeModal } from '../modals/DeleteTreeModal'
import { PrivateBadge } from '../PrivateBadge'

interface DashboardCreatedTreeCardProps {
  treeId: string
  title: string
  views: number
  createdAt: string
  numOfLinks: number
  isPublic: boolean
}

export const DashboardCreatedTreeCard: React.FC<
  DashboardCreatedTreeCardProps
> = ({ treeId, title, views, createdAt, numOfLinks, isPublic }) => {
  const router = useRouter()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <>
      <TreeCardLayout>
        <div className="flex justify-between">
          <NextLink href={`/tree/${treeId}`} passHref>
            <a className="hover:underline hover:text-li-green-main">
              <h2 className="font-semibold text-base">{title}</h2>
            </a>
          </NextLink>
          <Dropdown
            component={DropdownComponent.ICON}
            Icon={FiMoreVertical}
            dropdownItems={[
              {
                title: 'Visit',
                action: DropdownAction.BUTTON,
                clickHandler: () => {
                  router.push(`/tree/${treeId}`)
                },
              },
              {
                title: 'Edit',
                action: DropdownAction.BUTTON,
                clickHandler: () => {
                  router.push(`/draft/${treeId}/`)
                },
              },
              {
                title: 'Delete',
                action: DropdownAction.BUTTON,
                warning: true,
                clickHandler: () => {
                  setModalIsOpen(true)
                },
              },
            ]}
          />
        </div>
        <div className="flex flex-row text-sm space-x-4 text-li-gray-1100 dark:text-li-gray-700">
          {!isPublic && <PrivateBadge />}
          <StatsBadge label="views" count={views} Icon={IoEye} />
          <StatsBadge label="links" count={numOfLinks} Icon={IoLink} />
          <DateBadge date={formatDate(createdAt)} />
        </div>
      </TreeCardLayout>
      <DeleteTreeModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        treeId={treeId}
      />
    </>
  )
}
