/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "minio.nepalb.com",
      },
    ],
  },
};

export default nextConfig;
