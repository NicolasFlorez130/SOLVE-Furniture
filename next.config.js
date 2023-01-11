const withTM = require('next-transpile-modules')(['gsap', 'smooth-scrollbar'])

/** @type {import('next').NextConfig} */

const nextConfig = {
   basePath: '/SOLVE-Furniture',
   productionBrowserSourceMaps: true,
   reactStrictMode: true,
   swcMinify: true,
   images: {
      loader: 'akamai',
      path: '',
      domains: ['localhost', 'fathomless-scrubland-17753.herokuapp.com'],
   },
   assetPrefix: '/SOLVE-Furniture',
}


module.exports = withTM(nextConfig)
