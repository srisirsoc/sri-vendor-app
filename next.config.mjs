/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.mchacha.com',
      },
      {
        protocol: 'http',
        hostname: 'api.mchacha.com',
        pathname: '/srisir/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost:5001',
      },
    ],
  },
  env: {

    RAZORPAY_KEY_ID: "rzp_test_SCNLaIAtqgaZF4",

    MODE: "PROD",
    BASE_URL: "https://api.mchacha.com/srisir/api/v1",
    SOCKET_URL: "https://api.mchacha.com",

    // MODE: "DEV",
    // BASE_URL: "http://localhost:5001/api/v1",
    // SOCKET_URL: "http://localhost:5001",
  }
};
export default nextConfig;
