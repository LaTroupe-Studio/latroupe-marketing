/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig = {
  // Vercel: runtime Node + Image Optimization.
  // Export estático (S3/CloudFront, hosting simple): STATIC_EXPORT=1 npm run build → out/
  ...(isStaticExport ? { output: "export" } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isStaticExport ? { unoptimized: true } : {}),
  },
};

module.exports = nextConfig;
