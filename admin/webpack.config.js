const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const Workbox = require('workbox-webpack-plugin');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

module.exports = {
  output: {
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        DOMAIN: JSON.stringify(process.env.DOMAIN),
      },
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin(),
    // new WebappWebpackPlugin({
    //   logo: path.resolve('src/assets/images/icons/icon.png'),
    //   favicons: {
    //     appName: 'Pole&Harmony',
    //     developerURL: null,
    //     background: '#ffffff',
    //     theme_color: '#333333',
    //     crossorigin: 'use-credentials',
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
      HELPERS: path.resolve(__dirname, 'src/assets/js/helpers/'),
      REDUCERS: path.resolve(__dirname, 'src/reducers/'),
      VIEWS: path.resolve(__dirname, 'src/views/'),
      UI: path.resolve(__dirname, 'src/ui/'),
    }
  }
};
