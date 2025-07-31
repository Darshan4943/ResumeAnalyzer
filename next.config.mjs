/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: 'https://api.skilotech.com/api/sitemap.xml',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
