import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 768, 1024, 1280, 1920, 2560,],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512,],
  },
};

export default nextConfig;
