import { useAtom } from 'jotai'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaRegMoon, FaRegSun } from 'react-icons/fa'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { removeAccessToken } from '../lib/acess-token-operation'
import { setCurrUserAtom } from '../lib/atom'
import { cn } from '../lib/classname'
import { Dropdown, DropdownAction, DropdownComponent } from './Dropdown'

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

// links on navbar
const NavbarLink: React.FC<NavbarLinkProps> = ({ href, title }) => {
  const router = useRouter()

  return (
    <NextLink href={href} passHref>
      <a
        className={cn(
          router.pathname === href
            ? 'text-black font-semibold'
            : 'text-gray-500 hover:text-black',
          'px-2 text-sm',
        )}
      >
        {title}
      </a>
    </NextLink>
  )
}

// theme toggle button
interface ThemeToggleButtonProps {}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({}) => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {mounted && (
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="highlight w-9 h-9 bg-gray-100 dark:bg-gray-900 rounded-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 hover:ring-2 ring-gray-300 dark:ring-gray-500 transition-all"
          onClick={() => {
            setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
          }}
        >
          {resolvedTheme === 'dark' ? (
            <FaRegSun size={16} />
          ) : (
            <FaRegMoon size={16} />
          )}
        </button>
      )}
    </>
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
    <div className="bg-white dark:bg-black mt-0 sticky z-10 top-0 backdrop-filter backdrop-blur-lg bg-opacity-30">
      <nav className="max-w-3xl mx-auto w-full p-2">
        <div className="flex justify-between items-center">
          <NextLink href="/" passHref>
            <a className="text-base md:text-lg lg:text-2xl font-bold">
              Lientry
            </a>
          </NextLink>
          <div className="hidden sm:block">
            {currUser ? (
              <div className="flex space-x-4 items-center">
                <NavbarLink href="/" title="Home" />
                <NavbarLink href="/dashboard" title="Dashboard" />
                <Dropdown
                  component={DropdownComponent.AVATAR}
                  imgSrc="https://avatars.githubusercontent.com/u/62977699?v=4"
                  dropdownItems={[
                    {
                      title: 'Theme',
                      action: DropdownAction.BUTTON,
                      clickHandler: () => {
                        console.log('theme changed')
                      },
                    },
                    {
                      title: 'Sign out',
                      action: DropdownAction.BUTTON,
                      clickHandler: async () => {
                        removeAccessToken()
                        await execLogout()
                        location.reload()
                      },
                    },
                  ]}
                />
                <ThemeToggleButton />
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-4">
                <NavbarLink href="/" title="Home" />
                {navbarLinks.map((link, idx) => (
                  <NavbarLink key={idx} {...link} />
                ))}
                <ThemeToggleButton />
              </div>
            )}
          </div>
        </div>
      </nav>
      <hr />
    </div>
  )
}

/**
 * not auth -> Home Sign In Sign Out
 * auth -> Home Dashboard User
 */
