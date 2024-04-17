/** @type {import('next').NextConfig} */
import webpack from 'webpack'

const nextConfig = {
  experimental: {
    esmExternals: 'loose', // required to make html canvas work in Next13
  },
  webpack: (config, {isServer, nextRuntime}) => {
    config.externals = [...config.externals, {canvas: 'canvas'}]
    // Avoid AWS SDK Node.js require issue
    if (isServer && nextRuntime === 'nodejs') {
      config.plugins.push(new webpack.IgnorePlugin({resourceRegExp: /^aws-crt$/}))
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                      collapseGroups: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    })

    return config
  },
}

export default nextConfig