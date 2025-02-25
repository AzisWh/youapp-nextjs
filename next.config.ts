import type { NextConfig } from 'next';

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://techtest.youapp.ai/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
