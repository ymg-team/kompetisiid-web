import React from "react"
import ReactDOM from "react-dom"
import Routes from "./routes"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { renderRoutes } from "react-router-config"
import store from "../config/store"

if (typeof window != "undefined") require("../style/index.sass")

const App = () => (
  <BrowserRouter>
    <Provider store={store}>{renderRoutes(Routes)}</Provider>
  </BrowserRouter>
)

ReactDOM.hydrate(<App />, document.getElementById("root"))