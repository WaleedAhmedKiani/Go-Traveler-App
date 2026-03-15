import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "x123e27u5t.ufs.sh",
        pathname: "/f/**",  // optional but recommended
      },
    ],
  },
};

export default nextConfig;
