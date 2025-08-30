import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upgu4lrk1klwxdjf.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
