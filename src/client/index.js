import React from "react"
import ReactDOM from "react-dom"
import Routes from "./routes"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { renderRoutes } from "react-router-config"
import store from "../config/store"
import { initFirebase } from "../client/helpers/firebase"

if (typeof window != "undefined") {
  // global style of Kompetisi Id
  require("../style/index.sass")

  // initial firebase
  initFirebase()
}

const App = () => (
  <BrowserRouter>
    <Provider store={store}>{renderRoutes(Routes)}</Provider>
  </BrowserRouter>
)

ReactDOM.hydrate(<App />, document.getElementById("root"))
