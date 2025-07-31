/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: 'https://api.skilotech.com/api/sitemap.xml',
      },
    ];
  },
};

export default nextConfig;
