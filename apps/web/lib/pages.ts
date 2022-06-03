interface Page {
  name: string
  url: string
}

export const pages: Page[] = [
  { name: 'Sign In', url: '/sign-in' },
  { name: 'Sign Up', url: '/sign-up' },
  { name: 'Feed', url: '/feed' },
]
