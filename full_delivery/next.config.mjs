/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eu-west-2.graphassets.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  //   env: {
  //     NEXT_PUBLIC_CLERK_FRONTEND_API: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API,
  //     CLERK_API_KEY: process.env.CLERK_API_KEY,
  //   },
};

export default nextConfig;
