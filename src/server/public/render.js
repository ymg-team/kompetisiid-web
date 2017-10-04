/**
 * Created by yussan on 02/10/16.
 */
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {RouterContext, match} from 'react-router'
import {createLocation} from 'history/LocationUtils'
import {createMemoryHistory} from 'history'
import routes from '../../client/routes'
import version from '../../config/version'
import store from '../../config/store'
import Helmet from 'react-helmet'
import webpackAssets from '../../config/webpack-assets'

import { Provider } from 'react-redux'

const App = express()

// server rendering
module.exports = App.use((req, res) => {
    const location = createLocation(req.url)
    match({routes, location}, (err, redirectLocation, renderProps) => {
        if(err) return res.status(500).end('internal server error')
        if(!renderProps) return res.status(404).end('not found')

        // preloaded state
        let preloadedState = store.getState()

        //start render
        getReduxPromise().then(() => {
            let html = ''
            
            preloadedState = store.getState()
            let {userdata} = req.session
            if(userdata && userdata.meta && userdata.meta.code == 201 )
            {
                delete userdata.data.password
                delete userdata.data.token
                preloadedState.User.session = Object.assign({}, userdata)
            }
            try
            {
                html = ReactDOMServer.renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                )
            }catch(e)
            {
                console.error(e)
                return res.status(500).send('error rendering')
            }
            
            let head = Helmet.rewind()
            res.send(renderFullPage(head, html, preloadedState, req.session).replace(/\s\s+/g,""))
        })

        function getReduxPromise()
        {
            let {location, params} = renderProps
            let history = createMemoryHistory()
            let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent

            let promise = comp && comp.fetchData ?
                comp.fetchData({ query: location.query, params, store, history, token: req.session.token}) :
                Promise.resolve()

            return promise
        }
    })
})

function renderFullPage(head, html, state)
{
    return `
        <!DOCTYPE html>
        <html lang="id-id">
            <head>
                ${head.title.toString()}
                ${head.meta.toString()}
                ${head.style.toString()}
                ${head.link.toString()}
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="fb:app_id" content="1419514554927551" />
                <meta property="fb:admins" content="xyussanx" />
                <meta property="fb:pages" content="309615952470901" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="google-signin-client_id" content="362573543654-djkou7th41pu964e7qs32ggogn1rbah6.apps.googleusercontent.com">
                <meta name="google-site-verification" content="pUksy8ewwm4bzRVqaTQXKmWfRFZc9_L0iuESNDg7190" />
                <meta property="fb:app_id" content="1419514554927551">
                <meta property="fb:admins" content="100000359263988">
                <link href="/assets/4.2/css/style.css?v=${version.CSS_VERSION}" rel="stylesheet">
                <link href="/assets/4.2/lib/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet">
                <link rel="icon" href="/assets/icons/icon-128x128.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="Cari Kompetisi"/>
            </head>
            <body>
                <div id="root">${html}</div>
                <div id="fb-root"></div>
                ${head.script.toString()}
                ${getScript(state)}
            </body>
        </html>
    `
}

// initial script
function getScript(state)
{
    return `
    <script>
        if('serviceWorker' in navigator)
        {
            navigator.serviceWorker.register('/service-worker.js')
                .then(function(registration){
                    console.log(registration);
                }).catch(function(err){
                    console.log('ServiceWorker registration is failed', err);
                });
        }
    </script>  
    <script type="text/javascript">window.__data__ = ${JSON.stringify(state)}</script>
    <script type="text/javascript" src="https:////connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=1419514554927551" async defer></script>
    <script type="text/javascript" src="https://apis.google.com/js/platform.js" async defer></script>
    <script type="text/javascript" src="/assets/4.2/js/script-min.js?v=${version.JS_VERSION}"></script>
    <script src="${ webpackAssets.vendor.js }"></script>
    <script src="${ webpackAssets.app.js }"></script>
    ${process.env.NODE_ENV === 'production' ? getTrackingScript() : ''}
    `
}

// tracking script
function getTrackingScript()
{
    return `
    <!-- Histats.com  START  (aync)-->
    <script type="text/javascript">var _Hasync= _Hasync|| [];
    _Hasync.push(['Histats.start', '1,2475171,4,0,0,0,00010000']);
    _Hasync.push(['Histats.fasi', '1']);
    _Hasync.push(['Histats.track_hits', '']);
    (function() {
    var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
    hs.src = ('//s10.histats.com/js15_as.js');
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
    })();</script>
    <noscript><a href="/" target="_blank"><img  src="//sstatic1.histats.com/0.gif?2475171&101" alt="web stats" border="0"></a></noscript>
    <!-- Histats.com  END  -->    

    <!-- Ganal -->
    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-44428186-4', 'auto');
    ga('send', 'pageview');
    </script>
    <!-- end of Ganal -->
    `
}
