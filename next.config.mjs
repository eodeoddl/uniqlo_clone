/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: '/', destination: '/fashion-beauty' }];
  },
  async redirects() {
    return [
      {
        source: '/fashion-beauty',
        destination: '/',
        permanent: false, // or false depending on your use case
      },
    ];
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 1024, 2048, 3840],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
