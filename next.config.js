/** @type {import('next').NextConfig} */
const nextConfig = {
  // Despliegue en Vercel: Node runtime, middleware, Image Optimization
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
