// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // Cambia esto si usas imágenes de otros dominios
  },
};

export default nextConfig;
