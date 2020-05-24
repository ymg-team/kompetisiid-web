import superagent from "superagent"
import { alert } from "../../client/components/Alert"
import { httpException } from "./Exceptions"

export function requestApi(method, path, params = {}, callback) {
  method = method.toLowerCase()
  const formdata = !params || method === "get" ? {} : generateFormdata(params)
  return superagent[method](path)
    .withCredentials()
    .timeout(60000)
    .set("Accept", "application/json")
    .send(formdata)
    .on("error", err => {
      console.log("Api Caller Error", err)
      return callback(httpException(500, "Internal Error", true))
    })
    .end((err, res) => {
      if (err) {
        return callback(httpException(500, err, true))
      } else {
        try {
          const response = JSON.parse(res.text)
          if (method !== "get") {
            alert(
              true,
              response.message,
              response.status === 200 || response.status === 201
                ? "success"
                : "error"
            )
          }
          return callback(response)
        } catch (e) {
          console.log("Api Caller Error", "Response not JSON", res.text)
          return callback(httpException(500, "Response not JSON", true))
        }
      }
    })
}

function generateFormdata(params) {
  let formdata = new FormData()
  // return params
  Object.keys(params).map(n => {
    formdata.append(n, params[n])
  })

  return formdata
}
