import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' 'inline-speculation-rules' chrome-extension://ba8aa59c-7fd7-4583-846d-88da47c7134e/",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
