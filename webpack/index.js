if(process.env.NODE_ENV == 'development') require('dotenv').config()

const webpack  = require('webpack')
const Path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const BUILD_DIR = '../dist-client'

module.exports = {
  entry: {
      app: ['./src/client/index.js'],
      vendor: ['react','react-router','react-router-dom','react-router-config','react-helmet','redux','react-redux','superagent','redux-thunk','react-transition-group']
  },

  output: {
      path: Path.resolve(__dirname, BUILD_DIR),
      chunkFilename: '[name].[chunkhash].js',
      filename: process.env.NODE_ENV == 'production' ? '[name].[hash].js' : '[name].js',
      publicPath: '/build/'
  },

  plugins: [
    new AssetsPlugin({prettyPrint: true, path: Path.join(__dirname, '../src/config')}),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: process.env.NODE_ENV == 'production' ? 'vendor.[hash].js' : 'vendor.js',
        minChunks: Infinity
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            APP_KEY: JSON.stringify(process.env.APP_KEY || 'kompetisiid')
        } 
    }),
],

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.sass'],
    alias: {
        "react": "preact-compat",
        "react-dom": "preact-compat"
    }
  },

  module: {
      rules: [
          {
              test: /\.(js|jsx)$/,
              use: ['babel-loader']             
          },
          {
            test: /\.sass$/,
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }
            ]
          },
          {
            test: /\.css$/,
            use: [
                {
                    loader: "css-loader" // translates CSS into CommonJS
                },
                {
                    loader: "style-loader" // creates style nodes from JS strings
                }
            ]
          }
      ]
  }
}
