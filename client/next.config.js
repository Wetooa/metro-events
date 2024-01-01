/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tabnctctjkunpodfapsy.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
