/**
 * Created by yussan 9 Oct 2018
 * at Amegakure:after DIY, Indonesia
 */
import express from "express"
import ApiCaller from "../middlewares/apiCaller"

const Router = express.Router()

/**
 * @description controller to generate sitemap of competition
 * @method GET
 * @route /sitemap/competition
 * @return {xml}
 */
Router.get(
  "/competition",
  (req, res, next) => {
    req.reqdata = {
      method: "get",
      url: "/v2/sitemap/competition",
      version: "v42",
      resType: "text"
    }
    next()
  },
  ApiCaller
)

/**
 * @description controller to generate sitemap of news
 * @method GET
 * @route /sitemap/nes
 * @return {xml}
 */
Router.get(
  "/news",
  (req, res, next) => {
    req.reqdata = {
      method: "get",
      url: "/v2/sitemap/news",
      version: "v42",
      resType: "text"
    }
    next()
  },
  ApiCaller
)

export default Router
