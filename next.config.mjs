import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['edamam.com', 'www.edamam.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.edamam.com',
            },
        ],
    }
};

export default withNextIntl(nextConfig);
