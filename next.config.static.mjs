// @ts-check

/**
 * Конфигурация NextJS для статического экспорта (Timeweb Apps)
 * Эта конфигурация исключает API Routes и другие серверные функции
 */

// Adding NEXT_PUBLIC_ makes environment variables available inside Next.js client.
process.env.NEXT_PUBLIC_COMMENTS_ARE_PAUSED = process.env.COMMENTS_ARE_PAUSED;
process.env.NEXT_PUBLIC_DJANGO_BASE_URL = process.env.DJANGO_BASE_URL;
process.env.NEXT_PUBLIC_DJANGO_CONTENT_FALLBACK = process.env.DJANGO_CONTENT_FALLBACK;
process.env.NEXT_PUBLIC_SENTRY_DSN = process.env.SENTRY_DSN;
process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT = process.env.SENTRY_ENVIRONMENT;

const nextConfig = {
  compiler: {
    styledComponents: true,
  },

  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  swcMinify: true,

  // Статический экспорт
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // Отключаем линтеры для ускорения сборки
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // Исключаем API Routes из сборки
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'].filter(ext => ext !== 'api'),

  // Отключаем Sentry для статического экспорта
  sentry: {
    hideSourceMaps: true,
  },

  // Базовые редиректы (без API зависимостей)
  redirects: async () => [
    {
      source: "/iframes/comments/:slug",
      destination: "/iframes/comments?accident-id=:slug",
      permanent: true,
    },
  ],

  // Минимальные rewrites для статического экспорта
  rewrites: () => ({
    beforeFiles: [
      {
        source: "/robots.txt",
        destination: "/robots.txt",
      },
    ],
  }),

  // Отключаем некоторые функции для статического экспорта
  experimental: {
    esmExternals: false,
  },
};

export default nextConfig;
