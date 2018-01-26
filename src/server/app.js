import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'

import AppApi from './api'
import AppFeed from './feed'
import AppRender from './render'

import compression from 'compression'

const App = express()

App.disable('x-powered-by')

if(process.env.NODE_ENV === 'production')
{
    App.use(compression())
}

App.use(cookieParser())
App.use(cookieSession({
	secret: process.env.APP_KEY,
	name: 'ki_session',
	maxAge: 12 * 30 * 24 * 60 * 60 * 1000
}))

const staticOptions = function()
{
    if(process.env.NODE_ENV == 'production')
    {
        return {
            maxAge: 172800000,
            etag: false,
        }
    }else 
    {
        return {}
    }
}

// global midleware
App.use((req, res, next) => {
    if(!req.session.token) req.session.token = process.env.APP_KEY
    // log
    const debugReq = require('debug')('app:req')
    debugReq(`${req.method} ${req.originalUrl} at ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`)
    next()
})

// static files
App.use('/static', express.static(path.resolve(`${__dirname}/../../public/assets`), staticOptions()))
App.use('/assets', express.static(path.resolve(`${__dirname}/../../public/assets`), staticOptions()))
App.use('/build', express.static(path.resolve(`${__dirname}/../../dist-client`), staticOptions()))
App.use('/robot.txt', express.static(__dirname + '/../../public/robot.txt'))
App.use('/opensearch.xml', express.static(__dirname + '/../../public/opensearch.xml'))
App.use('/manifest.json', express.static(__dirname + '/../../public/manifest.json'))
App.use('/service-worker.js', express.static(__dirname + '/../../public/service-worker.js'))

// app routes
App.use('/api', AppApi)
App.use('/feed', AppFeed)
App.get('*', AppRender)

function checkAuth(req, res, next)
{
    if(req.url === '/login' && req.session.userdata && req.session.userdata.meta) return res.redirect('/')
    next()
}

export default App
