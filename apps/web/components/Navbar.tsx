import React from 'react'
import NextLink from 'next/link'

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
  return (
    <nav className="bg-white py-2 px-96 mt-0 sticky w-full z-10 top-0 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <NextLink href="/" passHref>
          <a className="text-base md:text-lg lg:text-2xl font-bold">Lientry</a>
        </NextLink>
        <div className="space-x-4">
          {navbarLinks.map(({ href, title }, idx) => (
            <NextLink key={idx} href={href} passHref>
              <a className="text-gray-500 hover:text-black px-2">{title}</a>
            </NextLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
