/** @type {import('next').NextConfig} */
const nextConfig = {
  // Experimental features untuk performa
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true,
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['localhost', 'your-domain.com'],
    unoptimized: process.env.NODE_ENV === 'development', // Untuk development
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Headers untuk security dan performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=*, microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Rewrites untuk API dan assets
  async rewrites() {
    return [
      {
        source: '/health',
        destination: '/api/ai-tryon',
      },
    ];
  },

  // Environment variables yang di-expose ke client
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Output configuration untuk deployment
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,

  // Webpack configuration untuk optimisasi
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimisasi untuk bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'commons',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }

    // Alias untuk komponen
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': './components',
      '@/lib': './lib',
      '@/styles': './styles',
    };

    return config;
  },

  // PWA Configuration (jika menggunakan next-pwa)
  // pwa: {
  //   dest: 'public',
  //   register: true,
  //   skipWaiting: true,
  //   disable: process.env.NODE_ENV === 'development',
  // },

  // Konfigurasi untuk kiosk mode
  ...(process.env.KIOSK_MODE === 'true' && {
    trailingSlash: false,
    poweredByHeader: false,
    generateEtags: false,
  }),
};

export default nextConfig;
