/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   images: {
      domains: ['localhost', 'fathomless-scrubland-17753.herokuapp.com']
   }
}

const withTM = require('next-transpile-modules')(['gsap', 'smooth-scrollbar'])

module.exports = withTM(nextConfig)

// module.exports = nextConfig