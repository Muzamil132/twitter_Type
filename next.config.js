/** @type {import('next').NextConfig} */
const nextConfig = {



  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['rb.gy',"lh3.googleusercontent.com","images.unsplash.com","media.istockphoto.com"]
  }
}

module.exports = nextConfig
