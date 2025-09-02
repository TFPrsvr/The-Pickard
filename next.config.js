/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {}
  },
  images: {
    domains: ['images.clerk.dev'],
  },
}

module.exports = nextConfig