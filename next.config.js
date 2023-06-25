const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

// https://github.com/vercel/next.js/tree/canary/examples/with-react-native-web
/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // NOTE: StrictMode was breaking web animations, so remove it
  reactStrictMode: false,
  webpack: (config, options) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
      'react-native/package.json$': 'react-native-web/package.json',
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];

    config.plugins.push(
      new webpack.EnvironmentPlugin({ JEST_WORKER_ID: null }), // reanimated: https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/web-support/#webpack-support
      new webpack.DefinePlugin({
        process: { env: {} }, // reanimated: https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/web-support/#webpack-support
        __DEV__: true, // TODO: this was set due to usage in RNGH. Probably should default to false
        _frameTimestamp: null,
        __frameTimestamp: null,
      })
    );

    return config;
    // return merge(config, {
    //   entry () {
    //     return config.entry().then((entries) => {
    //       return {
    //         'babel-polyfill': [],
    //         ...entries,
    //       };
    //     });
    //   },
    // });
  },
  transpilePackages: [
    '@gorhom/bottom-sheet',
    'react-native-gesture-handler',
    'react-native-reanimated',
  ],
}

module.exports = nextConfig
