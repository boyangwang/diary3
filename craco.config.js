const path = require('path');
const CracoLessPlugin = require('craco-less');
const webpack = require('webpack');
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  style: {
    postcssOptions: {
      plugins: [require('autoprefixer'), require('tailwindcss')],
    },
  },
  plugins: [{ plugin: CracoLessPlugin }],
  webpack: {
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
    },
    alias: {
      '@': resolve('src'),
      '@@': resolve('src/components'),
    },
  },
};
