import createNextIntlPlugin from 'next-intl/plugin';
import nextPWA from 'next-pwa';

const withNextIntl = createNextIntlPlugin('./app/i18n/request.tsx');

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withNextIntl(withPWA(nextConfig));
