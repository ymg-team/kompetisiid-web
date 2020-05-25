require("dotenv").config()
const webpack = require("webpack")
const { env } = process
const BrotliPlugin = require("brotli-webpack-plugin")

let config = require("./webpack")

if (env.NODE_ENV === "production") {
  // minify js
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: {
        except: ["exports", "require"]
      },
      output: {
        comments: false
      },
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )

  // brotli compression
  config.plugins.push(
    new BrotliPlugin({
      asset: "[path].br[query]",
      test: /\.(js|css|html|svg)$/,
      // threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = config
