const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.js',
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  output: {
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|pdf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
    }),
    new Dotenv({
      path: isProduction ? '.env.production' : '.env.local',
    }),
    new ESLintPlugin(),
    isProduction &&
      new MiniCssExtractPlugin({
        filename: 'styles.[contenthash].css',
      }),
    isProduction &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        generateStatsFile: true,
        statsOptions: { source: false },
        reportFilename: 'bundle-report.html',
        exclude: /node_modules/,
      }),
    isProduction &&
      new CompressionWebpackPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    new CleanWebpackPlugin(),
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 5,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          minSize: 0,
          maxSize: 1000000,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          minSize: 0,
          maxSize: 1000000,
        },
      },
    },
    runtimeChunk: 'single',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  externals: [
    function ({ request }, callback) {
      if (/^node_modules\//.test(request)) {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    },
  ],
};
