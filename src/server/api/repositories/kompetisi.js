import {requestAPI} from '../../helpers/apiCaller'

export function getCategories(callback)
{
    requestAPI('get', `/kategori/kategori`, {}, response => {
        callback(response)
    })
}

export function getJelajah(params, callback)
{
    const Url = params.query.popular && parseInt(params.query.popular) === 1 ? '/jelajah/popular' : '/jelajah'
    requestAPI('get', Url, params,  response => {
        callback(response)
    })
}

export function getDetail(id, callback)
{
    requestAPI('get', `/kompetisi/data/${id}`, {},  response => {
        callback(response)
    })
}

export function getPengumuman(id, callback)
{
    requestAPI('get', `/kompetisi/pengumuman/${id}`, {}, response => {
        callback(response)
    })
}

export function getRelated(id, callback)
{
    requestAPI('get', `/kompetisi/related/${id}`, {}, response => {
        callback(response)
    })
}

export function getFavoritedtag(params, callback)
{
    requestAPI('get', '/kompetisi/favoritedtags', {}, response => {
        callback(response)
    })
}
