const withTM = require('next-transpile-modules')([])

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
})
