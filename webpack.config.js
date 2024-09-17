const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "fs": false, // Ignore the fs module
      "path": require.resolve("path-browserify"),
      "vm": require.resolve("vm-browserify"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer"),
      "process": require.resolve("process")
    },
    alias: {
      'process': 'process/browser',
      'buffer': 'buffer'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    })
  ]
};
