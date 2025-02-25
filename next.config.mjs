/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(mov|mp4)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/videos/',
            outputPath: 'static/videos/',
            name: '[name].[hash].[ext]',
          },
        },
      });
      return config;
    },
    experimental: {
      turbo: {
        rules: {
          '*.{mov,mp4}': {
            loaders: ['file-loader'],
            as: 'file'
          }
        }
      },
      serverActions: {
        bodySizeLimit: '1000mb', // Increase the body size limit to 20 MB
      }
    }
};



export default nextConfig;
