// ai-chat-ghpages/next.config.ts
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // output: 'export',
  images: {
    domains: ['localhost'],
  },
  reactStrictMode: false,
  basePath: isProd ? '/ai-chat' : '',
  assetPrefix: isProd ? '/ai-chat/' : '',
  // env: {
  //   NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  // },
};

export default nextConfig;
