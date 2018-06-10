/**
 * Created by yussan on 28/01/17.
 */
export function getData(req, key) {
  return req.session && req.session[key] ? req.session[key] : {}
}

export function setData(req, key, data) {
  if (data.remember) req.sessionOptions.maxAge = 'Session'
  let nextsession = req.session.length > 0 ? req.session : {}
  nextsession[key] = data
  req.session = nextsession
  req.session.save()
}

export function update(req, key, nextdata) {
  let nextsession = req.session.length > 0 ? req.session : {}
  nextsession[key] = Object.assign({}, nextsession[key], nextdata)
  req.session = nextsession
  req.session.save()
}

export function destroy(req, key) {
  delete req.session[key]
}
