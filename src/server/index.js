import App from "./app"
import Loadable from "react-loadable"
const Port = process.env.KI_PORT || 1470

//start server
Loadable.preloadAll().then(() => {
  App.listen(Port, () => {
    console.log("Server is listening on port: " + Port)
  })
})
