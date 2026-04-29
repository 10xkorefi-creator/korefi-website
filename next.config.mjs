/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.korefi.ai' },
      { protocol: 'https', hostname: 'korefi.ai' },
      { protocol: 'https', hostname: 'qbwknhtreuhxciwcktld.supabase.co' },
    ],
  },
}

export default nextConfig
