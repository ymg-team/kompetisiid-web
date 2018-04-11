require('dotenv').config()
const { env } = process
const productionConf = require('./webpack/production')

let config = require('./webpack')

if(env.NODE_ENV === 'production') config.plugins.push(productionConf)

module.exports = config