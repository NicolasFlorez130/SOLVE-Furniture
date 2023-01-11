const withTM = require('next-transpile-modules')(['gsap', 'smooth-scrollbar'])

/** @type {import('next').NextConfig} */

const nextConfig = {
   productionBrowserSourceMaps: true,
   reactStrictMode: true,
   swcMinify: true,
   images: {
      domains: ['localhost', 'fathomless-scrubland-17753.herokuapp.com', 'res.cloudinary.com'],
   }
}

module.exports = withTM(nextConfig)

// module.exports = nextConfig