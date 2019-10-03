const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const images = require('./assets/images')

const isProduction = process.env.NODE_ENV === 'production'
const isLocalDev = process.env.LOCAL_DEV === 'true'
const outputPath = path.resolve(__dirname, '..', 'src', 'main', 'resources', 'static')
const assetsPath = path.resolve(__dirname, 'assets')
const govukAssetsPath = path.join(__dirname, 'node_modules', 'govuk-frontend', 'assets')

const plugins = [
  new HtmlWebpackPlugin({
    filename: isLocalDev ? 'index.html' : path.join('..', 'templates', 'index.html'),
    template: path.join(__dirname, 'html', 'index.html'),
    minify: isProduction && {
      html5: true,
      collapseWhitespace: true,
      caseSensitive: true,
      removeComments: true,
    },
    excludeChunks: [
      'maincss',
      'ie8',
    ],
  }),

  new CopyWebpackPlugin([{
    from: path.join(govukAssetsPath, 'fonts'),
    to: path.join(outputPath, 'assets', 'fonts'),
  }]),

  new CopyWebpackPlugin([{
    from: path.join(assetsPath, 'js', 'html5shiv.min.js'),
    to: path.join(outputPath, 'assets', 'js'),
  }]),

  new MiniCssExtractPlugin({
    allChunks: true,
    chunkFilename: 'assets/css/[name].css',
  }),

  new webpack.HashedModuleIdsPlugin(),

  new CleanWebpackPlugin([outputPath], {
    allowExternal: true,
  }),
]

module.exports = () => ({
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'none' : 'eval-source-map',
  entry: {
    main: [
      '@babel/polyfill',
      path.join(__dirname, 'js', 'index.js'),

      ...Object.values(images).map(image => path.join(assetsPath, 'images', image)),
    ],
    govuk: path.join(assetsPath, 'js', 'govuk-template.js'),

    maincss: path.join(__dirname, 'scss', 'main.scss'),
    ie8: path.join(__dirname, 'scss', 'ie8.scss'),
  },
  output: {
    filename: 'assets/js/[name].[hash].js',
    path: outputPath,
    publicPath:'/',
  },
  optimization: {
    runtimeChunk: 'single',
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: !isProduction,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.ico$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins,
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'js'),
    },
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/document-scanner/url', '/submit', '/log/error', '/log/event', '/log/info'],
        target: 'http://localhost:8080',
      },
    ],
  },
})
