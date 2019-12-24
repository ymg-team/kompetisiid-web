import React from "react"
import Loadable from "react-loadable"
import FullPagePreloaderOri from "../components/preloaders/FullPage"

// fullpage loader
const FullPagePreloader = () => (
  <FullPagePreloaderOri style={{ display: "flex", opacity: 1 }} />
)

// pages
const Index = Loadable({
  loader: () => import("../pages/calendar/index"),
  loading: FullPagePreloader
})


// layout
import EmptyLayout from "../layouts/EmptyLayout"

export default {
  path: "/calendar",
  component: EmptyLayout,
  routes: [
    {
      path: "/calendar",
      exact: true,
      fullscreen: true,
      component: Index
    }
  ]
}
