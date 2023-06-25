module.exports = {
  presets: [
    'next/babel',
    '@babel/preset-flow',
  ],
  plugins: [
    ['react-native-web', { commonjs: true }],
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin',
  ]
}
