/**
 * Created by yussan on 02/10/16.
 */
import express from "express"
import React from "react"
import { Provider } from "react-redux"
import ReactDOMServer from "react-dom/server"
import { StaticRouter } from "react-router"
import { renderRoutes, matchRoutes } from "react-router-config"
import routes from "../client/routes"
import version from "../config/version"
import store from "../config/store"
import Helmet from "react-helmet"
import webpackAssets from "../config/webpack-assets"
import { ServerStyleSheet, StyleSheetManager } from "styled-components"

// ref: https://www.styled-components.com/docs/advanced#server-side-rendering
const sheet = new ServerStyleSheet()

// news render handler
export default (req, res) => {
  let html,
    context = {}

  // detect static function fetchData in container target
  const promises = matchRoutes(routes, req.url).map(({ route, match }) => {
    let fetchData =
      route.component && route.component.fetchData
        ? route.component.fetchData
        : {}
    return fetchData instanceof Function
      ? fetchData({ store, params: match.params, query: req.query })
      : Promise.resolve()
  })

  // function to get string of html
  function renderHtml(body = "", state = {}, styleTags = "") {
    const head = Helmet.rewind()
    return `
        <!DOCTYPE html>
        <html lang="id-id">
            <head>
                ${head.title.toString()}
                ${head.meta.toString()}
                ${head.style.toString()}
                ${head.link.toString()}
                ${styleTags}
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
                <link rel="stylesheet" href="${webpackAssets.style.css}">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
                <link rel="icon" href="/assets/icons-red/icon-128x128.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="Cari Kompetisi"/>
                <style>
                // transition
                .card-enter {
                    opacity: 0.01;
                }
                .card-enter.example-enter-active {
                    opacity: 1;
                transition: opacity 500ms ease-in;
                }
                .card-leave {
                    opacity: 1;
                }
                .card-leave.example-leave-active {
                    opacity: 0.01;
                    transition: opacity 300ms ease-in;
                }
                </style>
            </head>
            <body>
                <div id="root">${body}</div>
                <div id="fb-root"></div>
                ${head.script.toString()}
                ${getScript(state)}
            </body>
        </html>
        `
        // .replace(/\s\s+/g, "")
  }

  // return function as promise
  return Promise.all(promises).then(() => {
    // return string html as responsed using react-dom-server
    try {
      // if react component valid
      html = ReactDOMServer.renderToString(
        <StyleSheetManager sheet={sheet.instance}>
          <StaticRouter location={req.originalUrl} context={context}>
            <Provider store={store}>{renderRoutes(routes)}</Provider>
          </StaticRouter>
        </StyleSheetManager>
      )
    } catch (err) {
      // if react not valid
      console.log("error render", err)
      html = "something wrong"
    }

    // res end
    if (context.url) {
      res.status(500).send("something wrong")
    } else {
      const state = store.getState()
      const styleTags = sheet.getStyleTags()

      // get session
      let { userdata } = req.session
      if (userdata && userdata.id) state.User.session = userdata
      else state.User.session = {}

      res.send(renderHtml(html, state, styleTags))
    }
  })
}

// initial script
function getScript(state) {
  // <script>
  //     if('serviceWorker' in navigator)
  //     {
  //         navigator.serviceWorker.register('/service-worker.js')
  //             .then(function(registration){
  //                 console.log(registration);
  //             }).catch(function(err){
  //                 console.log('ServiceWorker registration is failed', err);
  //             });
  //     }
  // </script>
  // <script type="text/javascript" src="https:////connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=1419514554927551" async defer></script>
  // <script type="text/javascript" src="https://apis.google.com/js/platform.js" async defer></script>
  return `
    <script type="text/javascript">window.__data__=${JSON.stringify(
      state
    )}</script>
    <script type="text/javascript" src="/assets/4.2/js/script-min.js?v=${
      version.JS_VERSION
    }"></script>
    <script src="${webpackAssets.vendor.js}"></script>
    <script src="${webpackAssets.app.js}"></script>
    ${process.env.NODE_ENV === "production" ? 
      `${getTrackingScript()} 
      ${getAdsenseScript()}` :  ""}
    `
}

// adsense script
function getAdsenseScript() {
  return `
  <!-- Gads -->
  <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  `
  // <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
}

// tracking script
function getTrackingScript() {
  return `
    <!-- Ganal -->
    <script type="text/javascript" async defer>
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
