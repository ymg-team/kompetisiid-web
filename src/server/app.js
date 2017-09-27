import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'

import AppPublic from './public'
import AppApi from './api'
import AppFeed from './feed'

import compression from 'compression'

const App = express()

App.disable('x-powered-by')

if(process.env.NODE_ENV === 'production')
{
    App.use(compression())
}

App.use(cookieParser())
App.use(cookieSession({
	secret: 'kindoyasds6&^USdgsudsiuGs6d6',
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
    if(!req.session.token) req.session.token = 'ki-324892374skljfhlsiudfh&6'
    // log
    const debugReq = require('debug')('app:req')
    debugReq(`${req.method} ${req.originalUrl} at ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`)
    next()
})

App.use('/robots.txt', express.static(__dirname + '/../../robots.txt'))
App.use('/assets', express.static(path.resolve(`${__dirname}/../../assets/4.2`), staticOptions()))
App.use('/api', AppApi)
App.use('/feed', AppFeed)
App.use('/', checkAuth, AppPublic)

function checkAuth(req, res, next)
{
    if(req.url === '/login' && req.session.userdata && req.session.userdata.meta) return res.redirect('/')
    next()
}

module.exports = App
