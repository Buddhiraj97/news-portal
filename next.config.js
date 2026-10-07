/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // News APIs return images from many different websites, so we allow any https/http host.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

module.exports = nextConfig;
