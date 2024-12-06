import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Recommended for catching errors early
  images: {
    domains: ["mr.fit.s3.eu-north-1.amazonaws.com"]
  },
};

export default nextConfig;
