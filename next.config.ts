import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgs.search.brave.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
