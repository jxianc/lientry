import React from 'react'
import { Dropdown, DropdownComponent, DropdownAction } from '../Dropdown'
import NextLink from 'next/link'
import Image from 'next/image'
import { TreeCardLayout } from './layouts/TreeCardLayout'
import { FiMoreVertical } from 'react-icons/fi'
import { IoEye, IoLink } from 'react-icons/io5'
import { formatDate } from '../../lib/date'
import { Badge } from '../badges/Badge'
import { StatsBadge } from '../badges/StatsBadge'
import { useRouter } from 'next/router'
import { useUnsaveTreeMutation } from '../../generated/graphql'
import { useAtom } from 'jotai'
import {
  ErrorAlert,
  setErrorAlertsAtom,
} from '../../lib/atom/error-alerts.atom'
import { gqlErrorHandler } from '../../lib/error-handler'

interface DashboardSavedTreeCardProps {
  treeId: string
  title: string
  userId: string
  userName?: string | null
  userImage?: string | null
  numOfLinks: number
  views: number
  createdAt: string
}

export const DashboardSavedTreeCard: React.FC<DashboardSavedTreeCardProps> = ({
  treeId,
  title,
  userId,
  userName,
  userImage,
  numOfLinks,
  views,
  createdAt,
}) => {
  const router = useRouter()
  const [__, execUnsaveTree] = useUnsaveTreeMutation()
  const [errorAlerts, setErrorAlerts] = useAtom(setErrorAlertsAtom)

  return (
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
              title: 'Remove',
              action: DropdownAction.BUTTON,
              warning: true,
              clickHandler: async () => {
                const { data, error } = await execUnsaveTree({ treeId })
                if (error) {
                  const errMsgs = gqlErrorHandler(error.graphQLErrors)

                  // TODO handle not logged in error here

                  setErrorAlerts(
                    errorAlerts.concat(
                      errMsgs.map(
                        (message, index): ErrorAlert => ({
                          index: index + errorAlerts.length,
                          message,
                        }),
                      ),
                    ),
                  )
                }
              },
            },
          ]}
        />
      </div>
      <div className="flex space-x-4 text-sm mt-2">
        <NextLink href={`/user/${userId}`} passHref>
          <a className="inline-flex items-center space-x-1">
            <Image
              alt="profile pic"
              src={
                userImage ||
                'https://avatars.githubusercontent.com/u/62977699?v=4'
                // TODO replace default profile picture
              }
              height={20}
              width={20}
              className="rounded-full"
            />
            <span className="text-sm font-semibold">
              {userName || `usr${userId}`}
            </span>
          </a>
        </NextLink>
        <div className="flex flex-row text-sm space-x-4 text-li-gray-1100 dark:text-li-gray-700">
          <StatsBadge label="views" count={views} Icon={IoEye} />
          <StatsBadge label="links" count={numOfLinks} Icon={IoLink} />
          <Badge text={formatDate(createdAt)} />
        </div>
      </div>
    </TreeCardLayout>
  )
}
