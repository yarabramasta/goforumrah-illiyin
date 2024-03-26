
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [576, 768, 1024, 1440, 1920].flatMap(size => [size, size * 2])
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

export default nextConfig
