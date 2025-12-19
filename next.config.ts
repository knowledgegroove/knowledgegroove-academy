import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: ['three'],
  basePath: '/academy',
};

export default nextConfig;
