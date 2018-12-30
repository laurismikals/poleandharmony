const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Workbox = require('workbox-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');

const distPath = path.join(__dirname, '../dist/admin');

module.exports = {
  output: { path: distPath },
  plugins: [
    new CleanWebpackPlugin([distPath], { allowExternal: true }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      output: { path: distPath },
    }),
    new MiniCssExtractPlugin(),
    // new WebappWebpackPlugin({
    //   logo: path.resolve('src/assets/images/icons/icon.png'),
    //   prefix: '../admin/favicons/',
    //   favicons: {
    //     appName: 'Pole&Harmony',
    //     developerURL: null,
    //     background: '#ffffff',
    //     theme_color: '#333333',
    //     crossorigin: 'use-credentials',
    //     start_url: '/admin/',
    //     icons: {
    //       coast: false,
    //       yandex: false
    //     }
    //   },
    // }),
    // new Workbox.GenerateSW({
    //   skipWaiting: true,
    //   clientsClaim: true,
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ]
      }
    ]
  },
  resolve: {
    alias: {
      ASSETS: path.resolve(__dirname, 'src/assets/'),
      VIEWS: path.resolve(__dirname, 'src/views/'),
      UI: path.resolve(__dirname, 'src/ui/'),
    }
  }
};
