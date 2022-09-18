/** @type {import('next').NextConfig} */
const nextConfig = {



  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['rb.gy',"lh3.googleusercontent.com"]
  }
}

module.exports = nextConfig
