/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: '/', destination: '/women' }];
  },
  async redirects() {
    return [
      {
        source: '/women',
        destination: '/',
        permanent: false, // or false depending on your use case
      },
    ];
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
