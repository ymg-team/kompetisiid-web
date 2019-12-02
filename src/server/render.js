/**
 * Created by yussan on 02/10/16.
 */
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
import Loadable from "react-loadable"

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
    // custom meta
    let metaTags, head

    if (!req.meta) {
      head = Helmet.renderStatic()
      metaTags = `
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.style.toString()}
        ${head.link.toString()}
      `
    } else {
      metaTags = `
      <title>${req.meta.title}</title>
      <meta name="description" content="${req.meta.desc}"/>
      <meta name="keywords" content="${req.meta.keywords ||
        "info kompetisi,kompetisi id,kumpulan lomba,info lomba,kumpulan kompetisi"}">

      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:image" content="${req.meta.image}"/>
      <meta name="twitter:title" content="${req.meta.title}"/>
      <meta name="twitter:description" content="${req.meta.desc}" />

      <meta property="og:title" content="${req.meta.title}" />
      <meta property="og:type" content="${req.meta.type || "blog"}" />
      <meta property="og:url" content="${req.meta.url ||
        "https://kompetisi.id"}" />
      <meta property="og:image" content="${req.meta.image}" />
      <meta property="og:description" content="${req.meta.desc}" />

      ${
        req.meta.jsonld
          ? `
        <script type="application/ld+json">${req.meta.jsonld}</script>
        `
          : ""
      }
      `
    }

    return `
        <!DOCTYPE html>
        <html lang="id-id">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="fb:app_id" content="1419514554927551" />
                <meta property="fb:admins" content="xyussanx" />
                <meta property="fb:pages" content="309615952470901" />
                <meta name="google-signin-client_id" content="362573543654-djkou7th41pu964e7qs32ggogn1rbah6.apps.googleusercontent.com">
                <meta name="google-site-verification" content="pUksy8ewwm4bzRVqaTQXKmWfRFZc9_L0iuESNDg7190" />
                <meta property="fb:app_id" content="1419514554927551">
                <meta property="fb:admins" content="100000359263988">
                <meta name="google-signin-client_id" content="825189798997-4gtj3pdnfpj2gvkvad6984emfg67kvec.apps.googleusercontent.com">
                ${styleTags}
                <link rel="stylesheet" href="${webpackAssets.style.css}">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
                <link href="https://fonts.googleapis.com/css?family=Raleway:400,500" rel="stylesheet">
                <link rel="icon" href="/assets/icons-red/icon-128x128.png" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="Cari Kompetisi"/>
                <style>
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
                ${metaTags}
                ${getGTMHeadScript()}
            </head>
            <body>
                <div id="root">${body}</div>
                <div id="fb-root"></div>
                ${head ? head.script.toString() : ""}
                ${getScript(state)}
                ${getGTMBodyScript()}
            </body>
        </html>
        `
    // .replace(/\s\s+/g, "")
  }

  let modules = []

  // return function as promise
  return Promise.all(promises).then(() => {
    // return string html as responsed using react-dom-server
    try {
      // if react component valid
      html = ReactDOMServer.renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <StyleSheetManager sheet={sheet.instance}>
            <StaticRouter location={req.originalUrl} context={context}>
              <Provider store={store}>{renderRoutes(routes)}</Provider>
            </StaticRouter>
          </StyleSheetManager>
        </Loadable.Capture>
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
  // ref __data__ : https://redux.js.org/recipes/serverrendering
  return `
    <script>window.__data__=${JSON.stringify(state).replace(
      /</g,
      "\\u003c"
    )}</script>
    <script src="/assets/4.2/js/script-min.js?v=${version.JS_VERSION}"></script>
    <script src="${webpackAssets.vendor.js}"></script>
    <script src="${webpackAssets.app.js}"></script>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId            : '1419514554927551',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v3.1'
        });
      };
    
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    </script>
    ${
      process.env.NODE_ENV === "production"
        ? `${getTrackingScript()} 
      ${getAdsenseScript()}`
        : ""
    }
    <script>
      if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js').then(function() { console.log("Service Worker Registered"); });
      }
    </script>
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

function getGTMHeadScript() {
  return `
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-PGTQ7FJ');</script>
  <!-- End Google Tag Manager -->
  `
}

function getGTMBodyScript() {
  return `
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PGTQ7FJ"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  `
}
