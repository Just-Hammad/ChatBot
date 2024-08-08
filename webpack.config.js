const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx', // Your main entry file
  output: {
    filename: 'widget-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ChatWidget', // Expose your component to global scope
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          'css-loader',
          'postcss-loader', // Add postcss-loader to handle PostCSS processing
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  stats: {
    errorDetails: true,
  },
};
