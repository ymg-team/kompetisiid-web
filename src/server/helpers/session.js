/**
 * Created by yussan on 28/01/17.
 */
export function getData(req, key){
    return req.session && req.session[key] ? req.session[key] : {}
}

export function setData(req, key, data){
    return new Promise((resolve, reject) => {
        if(data.remember) req.sessionOptions.maxAge = 'Session'
        let nextsession = req.session.length > 0 ? req.session : {}
        nextsession[key] = data
        req.session = nextsession
        resolve()
    })
}

export function update(req, key, nextdata)
{
    return new Promise((resolve, reject) => {
        let nextsession = req.session.length > 0 ? req.session : {}
        nextsession[key] = Object.assign({}, nextsession[key], nextdata)
        req.session = nextsession
        resolve()
    })
}

export function destroy(req, key)
{
    return new Promise((resolve, reject) => {
        delete req.session[key]
        resolve()
    })
}