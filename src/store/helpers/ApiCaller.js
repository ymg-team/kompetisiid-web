import superagent from 'superagent'
import { httpException } from './Exceptions'

export function requestApi(method, path, params = {}, callback)
{
  const formdata = !params || method.toLowerCase() === 'get' ? {} : generateFormdata(params)
  return superagent[method.toLowerCase()](path)
      .withCredentials()
      .timeout(60000)
      .set('Accept', 'application/json')
      .send(formdata)
      .on('error', () => {
        return callback(httpException(500, 'internal error', true))
      })
      .end((err, res) => {
        if(err)
        {
          return callback(httpException(500, err, true))
        }else
        {
          return callback(JSON.parse(res.text))
        }
      })
}

function generateFormdata(params)
{
  let formdata = new FormData()
  // return params
  Object.keys(params).map(n => {
    formdata.append(n, params[n])
  })

  return formdata
}
