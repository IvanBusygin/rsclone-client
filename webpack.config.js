const path = require('path');
const { ProgressPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PostcssPresetEnv } = require('postcss-preset-env');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { NetlifyPlugin } = require('netlify-webpack-plugin');

module.exports = () => {
  const isProd = process.env.NODE_ENV === 'production';

  const mode = isProd ? 'production' : 'development';
  const target = isProd ? 'browserslist' : 'web';
  const devtool = isProd ? undefined : 'inline-source-map'; // inline-source-map, source-map

  return {
    mode,
    target,
    devtool,
    context: path.join(__dirname, 'src'),
    entry: './index.tsx',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].[contenthash:8].js',
      clean: true,
      publicPath: '/',
    },
    devServer: {
      open: true,
      port: 'auto',
      hot: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(c|sa|sc)ss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isProd
                    ? '[local]-[hash:base64:5]'
                    : '[name]--[local]--[hash:base64:2]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: { plugins: PostcssPresetEnv },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(jpe?g|gif|ico|mp3|png|svg|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[hash][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]',
          },
        },
        {
          test: /\.t|jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
            'ts-loader',
          ],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new ProgressPlugin(),
      new CleanWebpackPlugin(),
      ...[new ESLintPlugin({ extensions: ['tsx', 'ts', 'jsx', 'js'] })],
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash:8].css',
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html'),
        filename: 'index.html',
        favicon: './assets/img/svg/logo.svg',
      }),
      new NetlifyPlugin({
        redirects: [{ from: '/*', to: '/index.html', status: 200 }],
      }),
    ],
    resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },
  };
};
