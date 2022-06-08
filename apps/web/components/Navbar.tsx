import { useAtom } from 'jotai'
import NextLink from 'next/link'
import React, { useEffect } from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { removeAccessToken } from '../lib/acess-token-operation'
import { setCurrUserAtom } from '../lib/atom'

interface NavbarProps {
  children?: React.ReactNode
}

interface NavbarLink {
  href: string
  title: string
}

const navbarLinks: NavbarLink[] = [
  {
    href: '/sign-in',
    title: 'Sign in',
  },
  {
    href: '/sign-up',
    title: 'Sign up',
  },
]

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
    <div className="bg-white mt-0 sticky w-full z-10 top-0 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <nav className=" max-w-7xl mx-auto p-2">
        <div className="flex justify-between items-center">
          <NextLink href="/" passHref>
            <a className="text-base md:text-lg lg:text-2xl font-bold">
              Lientry
            </a>
          </NextLink>
          <div className="hidden sm:block">
            {currUser ? (
              <div className="flex space-x-4 items-center">
                <div>{currUser.name}</div>
                <button
                  className="px-4 py-1 bg-red-500 text-white rounded-md"
                  onClick={async () => {
                    removeAccessToken()
                    await execLogout()
                  }}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                {navbarLinks.map(({ href, title }, idx) => (
                  <NextLink key={idx} href={href} passHref>
                    <a className="text-gray-500 hover:text-black px-2">
                      {title}
                    </a>
                  </NextLink>
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
