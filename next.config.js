/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
        pathname: '/free-vector/floral-welcome-lettering-concept_23-2147902326.jpg?size=338&ext=jpg&ga=GA1.1.1412446893.1704499200&semt=ais',
      },
      {
        protocol: 'https',
        hostname: 'www.movewelldaily.com',
        port: '',
        pathname: '/wp-content/uploads/2018/07/live-long-cover-2.jpg'
      }
    ],
  }
};
module.exports = nextConfig;
