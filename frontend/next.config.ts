import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    reactStrictMode: true, // Recommended for catching errors early
    images: {
      domains: ["mr.fit.s3.eu-north-1.amazonaws.com"]
    },
  };

// src={"https://mr.fit.s3.eu-north-1.amazonaws.com/1733321344309"}


export default nextConfig;
