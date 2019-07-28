/**
 * بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ
 * Created by yussan on 06/10/16.
 */

import React from "react"
import Loadable from "react-loadable"
import { Redirect } from "react-router-dom"

//  routes
import News from "./berita"
import Categories from "./categories"
import Browse from "./browse"
import Competition from "./competition"
import Add from "./add"
import User from "./user"
import Dashboard from "./dashboard/index"
import Careers from "./careers"
import Super from "./super/index"
import Settings from "./settings"

// components
import FullPagePreloaderOri from "../components/preloaders/FullPage"
const FullPagePreloader = () => (
  <FullPagePreloaderOri style={{ display: "flex", opacity: 1 }} />
)

// loadable containers
const ChangePassword = Loadable({
  loader: () => import("../containers/auth/ChangePassword"),
  loading: FullPagePreloader
})
const ForgotPassword = Loadable({
  loader: () => import("../containers/auth/ForgotPassword"),
  loading: FullPagePreloader
})
const Login = Loadable({
  loader: () => import("../containers/auth/Login"),
  loading: FullPagePreloader
})
const Register = Loadable({
  loader: () => import("../containers/auth/Register"),
  loading: FullPagePreloader
})
const RedirectContainer = Loadable({
  loader: () => import("../containers/Redirect"),
  loading: FullPagePreloader
})
const Error = Loadable({
  loader: () => import("../containers/error/index"),
  loading: FullPagePreloader
})
const EmailVerification = Loadable({
  loader: () => import("../containers/auth/EmailVerification"),
  loading: FullPagePreloader
})

// containers
import Home from "../containers/home/index"

// layouts
import LayoutRoot from "../layouts/4.2/Root"
// import LayoutHome from "../layouts/4.2/Home"
import LayoutHomeV5 from "../layouts/HomeLayoutV5"
// import LayoutError from "../layouts/4.2/Error"

export default [
  {
    component: LayoutRoot,
    routes: [
      {
        component: LayoutHomeV5,
        routes: [
          {
            path: "/",
            exact: true,
            component: Home
          },
          News,
          Browse,
          Competition,
          Add,
          Categories,
          User,
          Careers,
          Settings,
          {
            path: "/login",
            fullscreen: true,
            exact: true,
            component: Login
          },
          {
            path: "/register",
            fullscreen: true,
            exact: true,
            component: Register
          },
          {
            path: "/_super",
            fullscreen: true,
            exact: true,
            component: Login
          },
          {
            path: "/exit",
            fullscreen: true,
            exact: true,
            component: RedirectContainer
          },
          {
            path: "/forgot-password",
            fullscreen: true,
            exact: true,
            component: ForgotPassword
          },
          {
            path: "/change-password/:token",
            fullscreen: true,
            exact: true,
            component: ChangePassword
          },
          {
            fullscreen: true,
            path: "/email-verification/:token",
            exact: true,
            component: EmailVerification
          },

          // Super pages
          Super,

          // Dashboard pages
          Dashboard,

          // Redirect pages
          {
            path: "/berita/baca/:encid/:title",
            fullscreen: true,
            exact: true,
            component: props => {
              if (typeof window != "undefined")
                return (
                  <Redirect
                    to={`/news/${props.match.params.encid}/${
                      props.match.params.title
                    }`}
                  />
                )
              return null
            }
          },
          {
            fullscreen: true,
            path: "*",
            error_code: 404,
            error_msg: "Halaman yang anda kunjungi tidak ditemukan",
            component: Error
          }
        ]
      }
    ]
  }
]
