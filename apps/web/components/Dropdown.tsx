import React, { Fragment, MouseEventHandler } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiChevronDown } from 'react-icons/fi'
import { cn } from '../lib/classname'
import Image from 'next/image'
import { IconType } from 'react-icons/lib'

export enum DropdownAction {
  BUTTON = 'button',
  EXTERNAL_LINK = 'external link',
}

interface BaseDropdownItem {
  title: string
  action: DropdownAction
  warning?: boolean
}

interface ButtonDropdownItem extends BaseDropdownItem {
  action: DropdownAction.BUTTON
  clickHandler: MouseEventHandler<HTMLButtonElement>
}

interface ExternalLinkDropdownItem extends BaseDropdownItem {
  action: DropdownAction.EXTERNAL_LINK
  href: string
}

type DropdownItem = ExternalLinkDropdownItem | ButtonDropdownItem

export enum DropdownComponent {
  BUTTON = 'button',
  AVATAR = 'avatar',
  ICON = 'icon',
}

interface BaseDropdown {
  component: DropdownComponent
  dropdownItems: DropdownItem[]
}

interface ButtonDropdown extends BaseDropdown {
  component: DropdownComponent.BUTTON
  title: string
}

interface AvatarDropdown extends BaseDropdown {
  component: DropdownComponent.AVATAR
  imgSrc: string
}

interface IconDropdown extends BaseDropdown {
  component: DropdownComponent.ICON
  Icon: IconType
}

// dropdown component
type DropdownProps = ButtonDropdown | AvatarDropdown | IconDropdown

export const Dropdown: React.FC<DropdownProps> = (p) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        {p.component === DropdownComponent.AVATAR ? (
          // avatar dropdown
          <Menu.Button className="flex px-2">
            <Image
              alt="profile pic"
              src={p.imgSrc}
              height={28}
              width={28}
              className="rounded-full"
            />
          </Menu.Button>
        ) : p.component === DropdownComponent.BUTTON ? (
          // button dropdown
          <Menu.Button className="inline-flex items-center justify-center border border-gray-300 px-2 py-1 text-sm rounded-[0.3rem]">
            <span>{p.title}</span>
            <FiChevronDown className="ml-2" />
          </Menu.Button>
        ) : (
          // icon dropdown
          <Menu.Button>
            <p.Icon size={18} />
          </Menu.Button>
        )}
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-52 rounded-[0.3rem] shadow-md bg-white dark:bg-li-gray-1300 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {p.dropdownItems.map((d, idx) => (
              <Menu.Item key={idx}>
                {({ active }) => (
                  <div
                    className={cn(
                      active
                        ? 'bg-gray-100 dark:bg-li-gray-1200 cursor-pointer'
                        : 'bg-white dark:bg-li-gray-1300',
                      'block px-4 py-2 text-sm w-full',
                    )}
                  >
                    {d.action === 'button' ? (
                      <button
                        className={cn(
                          'w-full text-left',
                          d.warning ? 'text-red-600 dark:text-red-500' : '',
                        )}
                        onClick={d.clickHandler}
                      >
                        {d.title}
                      </button>
                    ) : (
                      <a
                        href={d.href}
                        className={cn(
                          'w-full text-left',
                          d.warning ? 'text-red-600 dark:text-red-500' : '',
                        )}
                      >
                        {d.title}
                      </a>
                    )}
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
