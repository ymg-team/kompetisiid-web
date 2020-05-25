import express from "express"
import path from "path"
import cookieSession from "cookie-session"

import AppApi from "./routes/api/index"
import AppFeed from "./controllers/feed"
import AppSitemap from "./controllers/sitemap"
import AppRender from "./render"

import * as AuthMiddleware from "./middlewares/auth"
import * as FrontMiddleware from "./middlewares/frontend"

const App = express()

App.disable("x-powered-by")

if (process.env.NODE_ENV === "production") {
  const compression = require("compression")
  App.use(compression())
}

App.use(
  cookieSession({
    name: "kompetisi-id",
    keys: [process.env.APP_KEY || "kompetisi", "kompetisid"],
    maxAge: 12 * 30 * 24 * 60 * 60 * 1000
  })
)

const staticOptions = function() {
  if (process.env.NODE_ENV == "production") {
    return {
      maxAge: 12 * 30 * 24 * 60 * 60 * 1000,
      etag: false
    }
  } else {
    return {}
  }
}

// app routes
App.use("/api", AppApi)
App.use("/feed", AppFeed)
App.use("/sitemap", AppSitemap)

// dashboard pages, only for 'member'
App.get("/login", AuthMiddleware.dashboardMiddleware, AppRender)
App.get("/dashboard", AuthMiddleware.dashboardMiddleware, AppRender)
App.get("/dashboard/*", AuthMiddleware.dashboardMiddleware, AppRender)
App.get("/settings/*", AuthMiddleware.dashboardMiddleware, AppRender)

// super pages, only for 'admin'
App.get("/super", AuthMiddleware.superMiddleware, AppRender)
App.get("/super/*", AuthMiddleware.superMiddleware, AppRender)

// ref: https://web.dev/codelab-text-compression-brotli/
App.get("/build/*.js", (req, res, next) => {
  req.url = req.url + ".br"
  res.set("Content-Encoding", "br")
  res.set("Content-Type", "application/javascript; charset=UTF-8")
  next()
})
// static files
App.use(
  "/static",
  express.static(
    path.resolve(`${__dirname}/../../public/assets`),
    staticOptions()
  )
)
App.use(
  "/assets",
  express.static(
    path.resolve(`${__dirname}/../../public/assets`),
    staticOptions()
  )
)
App.use(
  "/build",
  express.static(
    path.resolve(`${__dirname}/../../dist-client`),
    staticOptions()
  )
)
App.use("/robots.txt", express.static(__dirname + "/../../public/robots.txt"))
App.use(
  "/opensearch.xml",
  express.static(__dirname + "/../../public/opensearch.xml")
)
App.use(
  "/manifest.json",
  express.static(__dirname + "/../../public/manifest.json")
)
App.use(
  "/service-worker.js",
  express.static(__dirname + "/../../public/service-worker.js")
)
App.use("/ads.txt", express.static(__dirname + "/../../public/ads.txt"))
App.use(
  "/firebase-messaging-sw.js",
  express.static(__dirname + "/../../public/firebase-messaging-sw.js")
)
// route of /.well-know
App.use("/.well-known", express.static(__dirname + "/../../public/.well-known"))

// React path

// SEO manager
App.get(
  "/competition/:id/*",
  FrontMiddleware.generateMetaCompetition,
  AppRender
)
App.get("/news/:id/*", FrontMiddleware.generateMetaNews, AppRender)

// global routes
App.get("*", AppRender)

export default App
