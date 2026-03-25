/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig = {
  // Despliegue en Vercel: Node runtime, middleware, Image Optimization
  // Despliegue S3/CloudFront: STATIC_EXPORT=1 npm run build → carpeta out/
  ...(isStaticExport ? { output: "export" } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isStaticExport ? { unoptimized: true } : {}),
  },
};

module.exports = nextConfig;
