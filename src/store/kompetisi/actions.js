import {requestApi} from '../helpers/ApiCaller'
import {POST_DATA, RECEIVE_DATA, RECEIVE_MORE_DATA, DELETE_DATA, REQUEST_DATA} from '../consts'
import {serialize} from '../../server/helpers/url'
import {CALL_API} from '../middlewares/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export function fetchJelajah(params, filter)
{
    const url = '/api/jelajah'
    return {
        [CALL_API] : {
            typeSuccess: RECEIVE_DATA,
            typeWaiting: REQUEST_DATA,
            filter,
            method: 'get',
            target: 'kompetisi_jelajah',
            url: `${url}?${serialize(params)}`
        }
    }
}


export function getRelated(id, filter)
{
    return {
        [CALL_API] : {
            typeSuccess: RECEIVE_DATA,
            typeWaiting: REQUEST_DATA,
            method: 'get',
            filter,
            target: 'kompetisi_related',
            url: `/api/kompetisi/related/${id}`
        }
    }
}

export function getCategories()
{
    return {
        [CALL_API] : {
            typeSuccess: RECEIVE_DATA,
            typeWaiting: REQUEST_DATA,
            method: 'get',
            target: 'kompetisi_categories',
            url: '/api/kompetisi/kategori'
        }
    }
}

export function setCategories(json)
{
    return {
            type: RECEIVE_DATA,
            json,
            target: 'kompetisi_categories'
        }
}

export function getJelajah(params, filter)
{
    return dispatch => {
        dispatch(receiveJelajah(filter))
        requestApi('get', `/api/jelajah?${serialize(params)}`, params, res => {
            dispatch(receiveJelajah(filter, res))
        })
    }
}

export function getJelajahMore(params, filter) {
    return dispatch => {
        dispatch(receiveJelajahMore(filter))
        requestApi('get', `/api/jelajah?${serialize(params)}`, params, res => {
            dispatch(receiveJelajahMore(filter, res))
        })
    }
}

export function getDetail(id)
{
    return {
        [CALL_API] : {
            url: `/api/kompetisi/${id}`,
            method: 'get',
            typeWaiting: REQUEST_DATA,
            typeSuccess: RECEIVE_DATA,
            target: 'kompetisi_detail',
            filter: id
        }
    }
}

export function getPengumuman(id)
{
    return {
        [CALL_API] : {
            url: `/api/kompetisi/pengumuman/${id}`,
            method: 'get',
            typeWaiting: REQUEST_DATA,
            typeSuccess: RECEIVE_DATA,
            target: 'kompetisi_pengumuman',
            filter: id
        }
    }
}

export function getFavoritedTags(params = {})
{
    return {
        [CALL_API] : {
            url: '/api/kompetisi/favoritedtags',
            method: 'get',
            typeWaiting: REQUEST_DATA,
            typeSuccess: RECEIVE_DATA,
            target: 'tags',
            filter: 'favorited'
        }
    }
}

function receiveJelajah(filter, json = null)
{
    let type, target
    if(!json)
    {
        type = REQUEST_DATA
        target = 'kompetisi_jelajah'
    }else{
        type = RECEIVE_DATA
        target = 'kompetisi_jelajah'
    }
    return {
        type,
        target,
        filter,
        json
    }
}

function receiveJelajahMore(filter, json = null)
{
    let type, target
    if(!json)
    {
        type = REQUEST_DATA
        target = 'kompetisi_jelajah'
    }else{
        type = RECEIVE_MORE_DATA
        target = 'kompetisi_jelajah'
    }
    return {
        type,
        target,
        filter,
        json
    }
}
