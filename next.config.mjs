/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      domains: ['i.etsystatic.com', 'via.placeholder.com', '127.0.0.1'], // Add the domain hosting the images
    },
    // Add any other custom Next.js configuration here
  };
  
  export default nextConfig;
  