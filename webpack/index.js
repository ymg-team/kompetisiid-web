if (process.env.NODE_ENV == 'development') require('dotenv').config()

const { NODE_ENV, APP_KEY } = process.env

const webpack = require('webpack')
const Path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const BUILD_DIR = '../dist-client'
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    style: ['./src/style/index.sass'],
    app: ['./src/client/app.js'],
    vendor: [
      'react',
      'react-router',
      'react-router-dom',
      'react-router-config',
      'react-helmet',
      'redux',
      'react-redux',
      'superagent',
      'react-transition-group'
    ]
  },

  output: {
    path: Path.resolve(__dirname, BUILD_DIR),
    filename: NODE_ENV == 'production' ? '[name].[hash].js' : '[name].js',
    chunkFilename: NODE_ENV == 'production' ? '[name].[hash].js' : '[name].js',
    publicPath: '/build/'
  },

  plugins: [
    new AssetsPlugin({
      prettyPrint: true,
      path: Path.join(__dirname, '../src/config')
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: NODE_ENV == 'production' ? 'vendor.[hash].js' : 'vendor.js',
      minChunks: Infinity
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV || 'development'),
        APP_KEY: JSON.stringify(APP_KEY || 'kompetisiid')
      }
    }),
    new ExtractTextPlugin(
      NODE_ENV == 'production' ? '[name].[hash].css' : '[name].css'
    )
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.sass'],
    // alias: {
    //   react: 'preact-compat',
    //   'react-dom': 'preact-compat'
    // }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: ['es2015', 'react'],
              plugins: ['transform-class-properties', 'syntax-dynamic-import'],
              env: {
                production: {
                  presets: []
                }
              }
            }
          }
        ]
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { minimize: NODE_ENV === 'production' }
            },
            { loader: 'sass-loader' }
          ]
        })
      }
      // ,
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: 'css-loader' // translates CSS into CommonJS
      //     },
      //     {
      //       loader: 'style-loader' // creates style nodes from JS strings
      //     }
      //   ]
      // }
    ]
  }
}
