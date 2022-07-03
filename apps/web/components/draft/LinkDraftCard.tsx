import React, { useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { LinkStatus } from '../../lib/atom/draft-tree.atom'
import { Dropdown, DropdownAction, DropdownComponent } from '../Dropdown'
import { DeleteLinkModal } from '../modals/DeleteLinkModal'
import { EditLinkFormModal } from '../modals/EditLinkFormModal'

interface LinkDraftCardProps {
  linkId: string
  linkStatus: LinkStatus
  title: string
  description?: string | null
  url: string
}

export const LinkDraftCard: React.FC<LinkDraftCardProps> = ({
  linkId,
  linkStatus,
  title,
  description,
  url,
}) => {
  const [editLinkModalIsOpen, setEditLinkModalIsOpen] = useState(false)
  const [deleteLinkModalIsOpen, setDeleteLinkModalIsOpen] = useState(false)

  return (
    <div className="h-full p-4 w-full ml-auto rounded-[0.3rem] bg-li-gray-100 dark:bg-li-gray-1400">
      <div className="flex flex-row justify-between">
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
        <EditLinkFormModal
          linkId={linkId}
          linkStatus={linkStatus}
          title={title}
          description={description}
          url={url}
          modalIsOpen={editLinkModalIsOpen}
          setModalIsOpen={setEditLinkModalIsOpen}
        />
        <DeleteLinkModal
          modalIsOpen={deleteLinkModalIsOpen}
          setModalIsOpen={setDeleteLinkModalIsOpen}
          linkId={linkId}
        />
        <Dropdown
          component={DropdownComponent.ICON}
          Icon={FiMoreVertical}
          dropdownItems={[
            {
              title: 'Visit',
              action: DropdownAction.EXTERNAL_LINK,
              href: url,
            },
            {
              title: 'Info',
              action: DropdownAction.EXTERNAL_LINK,
              href: '/#',
            },
            {
              title: 'Edit',
              action: DropdownAction.BUTTON,
              clickHandler: async () => {
                setEditLinkModalIsOpen(true)
              },
            },
            {
              title: 'Delete',
              action: DropdownAction.BUTTON,
              clickHandler: async () => {
                setDeleteLinkModalIsOpen(true)
              },
            },
          ]}
        />
      </div>
    </div>
  )
}
