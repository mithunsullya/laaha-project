const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: process.env.NEXT_IMAGE_DOMAIN },
      { hostname: 'test.laaha.org' },
      { hostname: 'laaha.org' },
      { hostname: 'edit-dev.laaha.org' }
    ],
    localPatterns: [{
      pathname: '/assets/images/**',
      search: ''
    }]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // {
          //   key: 'Content-Security-Policy',
          //   value: `
          //     default-src 'self' *.laaha.org:* 'unsafe-inline' 'unsafe-eval' *.sharethis.com:* *.cloudflare.com:* *.google-analytics.com:* *.googletagmanager.com:* *.gstatic.com:* *.googleapis.com:* *.fontawesome.com:* *.addtoany.com:* *.disqus.com:* *.facebook.com:* *.facebook.net:* *.google.com:* *.linkedin.com:* *.twitter.com:* *.youtube.com:* *.vimeo.com:* *.instagram.com *.newrelic.com:* *.nr-data.net:* *.jquery.js:* *.chosen.css:* *.opencagedata.com:* data:;
          //     script-src 'self' 'unsafe-inline' 'unsafe-eval' *.laaha.org:* *.google-analytics.com:* *.googletagmanager.com:* *.jsdelivr.net:* *.jquery.com:* *.cloudflare.com:* unpkg.com:* https://player.vimeo.com https://api.ipify.org;
          //     connect-src 'self' *.laaha.org:* https://api.ipify.org https://vimeo.com https://player.vimeo.com https://*.vimeo.com https://*.vimeocdn.com https://fonts.googleapis.com https://fonts.gstatic.com ws://localhost:* wss://localhost:*;
          //     style-src 'self' 'unsafe-inline' *.jsdelivr.net:* https://fonts.googleapis.com *.cloudflare.com:*;
          //     img-src 'self' *.google-analytics.com:* data: https://player.vimeo.com https://api.ipify.org https://i.vimeocdn.com;
          //     frame-src *.vimeo.com *.laaha.org:*;
          //     frame-ancestors 'self' *.laaha.org:*;
          //     font-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.gstatic.com *.gstatic.com:* *.googleusercontent.com:* *.googleapis.com:* *.fontawesome.com:* *.jsdelivr.net:* *.cloudflare.com:*;
          //     worker-src 'self' blob:;
          //     `.replace(/\s{2,}/g, ' ').trim()
          // },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  }
};

module.exports = withNextIntl(nextConfig);
