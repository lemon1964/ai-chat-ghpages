// ai-chat-ghpages/next.config.ts
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  reactStrictMode: false,
  basePath: isProd ? '/ai-chat-ghpages' : '',
  assetPrefix: isProd ? '/ai-chat-ghpages/' : '',
};

export default nextConfig;
