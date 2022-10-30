module.exports = {
  reactStrictMode: true,
  images: {
    domains: process.env.IMAGES_DOMAINS?.split(',') || [],
  },
  experimental: {
    // Enable styled-components SWC transform
    styledComponents: true,
  },
  swcMinify: true,
}
