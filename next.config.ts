import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/stock-market-analyzer',
        destination: 'https://stock-market-analyzer-sigma.vercel.app/',
      },
      {
        source: '/stock-market-analyzer/:path*',
        destination: 'https://stock-market-analyzer-sigma.vercel.app/:path*',
      },
    ]
  },
};

export default nextConfig;
