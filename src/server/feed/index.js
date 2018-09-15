/**
 * Created by yussan on 17/02/17.
 */
import express from "express"
import ApiCaller from "../api/middlewares/apiCaller"

const Router = express.Router()

/**
 * @description function to get feed kompetisi
 * @method GET
 * @route /feed
 * @return mixed
 */
Router.get(
  "/",
  (req, res, next) => {
    req.reqdata = {
      method: "get",
      url: "/v2/feed/competition",
      version: "v42",
      resType: "text"
    }
    next()
  },
  ApiCaller
)

/**
 * @description function to get feed berita
 * @method GET
 * @route /feed/berita
 * @return mixed
 */
Router.get(
  "/berita",
  (req, res, next) => {
    req.reqdata = {
      method: "get",
      url: "/v2/feed/news",
      version: "v42",
      resType: "text"
    }
    next()
  },
  ApiCaller
)

/**
 * Function to get feed berita
 * @method GET
 * @route /feed/berita
 * @return mixed
 */
Router.get(
  "/news",
  (req, res, next) => {
    req.reqdata = {
      method: "get",
      url: "/feed/berita",
      resType: "text"
    }
    next()
  },
  ApiCaller
)

export default Router
