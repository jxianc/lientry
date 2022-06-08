import { useAtom } from 'jotai'
import NextLink from 'next/link'
import React, { useEffect } from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { removeAccessToken } from '../lib/acess-token-operation'
import { setCurrUserAtom } from '../lib/atom'
import { Dropdown } from './Dropdown'

interface NavbarProps {
  children?: React.ReactNode
}

interface NavbarLinkProps {
  href: string
  title: string
}

const navbarLinks: NavbarLinkProps[] = [
  {
    href: '/sign-in',
    title: 'Sign in',
  },
  {
    href: '/sign-up',
    title: 'Sign up',
  },
]

export const NavbarLink: React.FC<NavbarLinkProps> = ({ href, title }) => {
  return (
    <NextLink href={href} passHref>
      <a className="text-gray-500 hover:text-black px-2 text-sm">{title}</a>
    </NextLink>
  )
}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data }] = useMeQuery()
  const [_, execLogout] = useLogoutMutation()
  const [currUser, setCurrUser] = useAtom(setCurrUserAtom)

  useEffect(() => {
    if (data && data.me) {
      setCurrUser(data.me)
    } else {
      setCurrUser(null)
    }
  }, [data, setCurrUser])

  return (
    <div className="bg-white mt-0 sticky z-10 top-0 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <nav className="max-w-5xl mx-auto w-full p-2">
        <div className="flex justify-between items-center">
          <NextLink href="/" passHref>
            <a className="text-base md:text-lg lg:text-2xl font-bold">
              Lientry
            </a>
          </NextLink>
          <div className="hidden sm:block">
            {currUser ? (
              <div className="flex space-x-4 items-center">
                <NavbarLink href="/dashboard" title="Dashboard" />
                <Dropdown
                  component={'avatar'}
                  dropdownItems={[
                    {
                      title: 'Theme',
                      action: 'button',
                      clickHandler: () => {
                        console.log('theme changed')
                      },
                    },
                    {
                      title: 'Sign out',
                      action: 'button',
                      clickHandler: async () => {
                        removeAccessToken()
                        await execLogout()
                      },
                    },
                  ]}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-4">
                {navbarLinks.map((link, idx) => (
                  <NavbarLink key={idx} {...link} />
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
      <hr />
    </div>
  )
}
