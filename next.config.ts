import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Firebase Hosting (static export to /out)
  output: "export",
  // next/image doesn't work with static export without a server — disable optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
