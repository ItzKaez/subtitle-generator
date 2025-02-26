/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(mov|mp4)$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/videos/[name].[hash][ext]',
            },
        });
        return config;
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '1000mb',
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    }
};

export default nextConfig;
