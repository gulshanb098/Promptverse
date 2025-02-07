/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Enable app directory if needed (still experimental)
  },
  serverExternalPackages: ["mongoose"], // Updated configuration for external packages
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  // No Webpack configuration needed for Turbopack
}

module.exports = nextConfig;