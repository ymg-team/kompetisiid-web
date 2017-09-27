/**
 * الرَّحِيم الرَّحْمَنِ اللَّهِ بِسْمِ
 * created by yussan 23 Oct 2016 18:29
 */

import {serialize} from '../../server/helpers/url'
import {CALL_API} from '../middlewares/api'
import {RECEIVE_DATA, RECEIVE_MORE_DATA, REQUEST_DATA} from '../consts'

export function fetchBeritaDetail(id)
{
    return {
        [CALL_API] : {
            method: 'get',
            url : `/api/news/${id}`,
            target: 'berita_detail',
            typeWaiting: REQUEST_DATA,
            typeSuccess: RECEIVE_DATA,
            filter: id
        }
    }
}

export function fetchBerita(params = {}, filter)
{
    return {
        [CALL_API] : {
            method: 'get',
            url: `/api/news?${serialize(params)}`,
            target: 'berita_list',
            filter,
            typeSuccess: RECEIVE_DATA,
            typeWaiting: REQUEST_DATA
        }
    }
}

export function fetchBeritaMore(params = {}, filter)
{
    return {
        [CALL_API] : {
            method: 'get',
            url: `/api/news?${serialize(params)}`,
            target: 'berita_list',
            filter,
            typeSuccess: RECEIVE_MORE_DATA,
            typeWaiting: REQUEST_DATA
        }
    }
}

export function relatedBerita(encid)
{
    return {
        [CALL_API] : {
            method: 'get',
            url: `/api/news/related/${encid}`,
            target: 'berita_list',
            filter: `related_${encid}`,
            typeSuccess: RECEIVE_DATA,
            typeWaiting: REQUEST_DATA
        }
    }
}