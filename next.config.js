/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   images: {
      domains: ['localhost', 'fathomless-scrubland-17753.herokuapp.com']
   }
}

module.exports = nextConfig
