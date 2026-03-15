import type { NextConfig } from "next";

const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "x123e27u5t.ufs.sh",
        pathname: "/f/**",  
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
