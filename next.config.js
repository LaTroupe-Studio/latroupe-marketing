/** @type {import('next').NextConfig} */
const basePath = "/beta";

const nextConfig = {
  // Export estático para hosting sin Node (p. ej. Hostinger): subir el contenido de `out/` a public_html/beta/
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
