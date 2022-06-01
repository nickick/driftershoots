/** @type {import('next').NextConfig} */

const withFonts = require('next-fonts');

module.exports = withFonts({
  enableSvg: true,
  webpack(config) {
    return config;
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'storage.googleapis.com',
    ]
  },
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=0, s-maxage=86400'
          }
        ]
      }
    ]
  }
});
