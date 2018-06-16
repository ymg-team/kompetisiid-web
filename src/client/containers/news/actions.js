/**
 * الرَّحِيم الرَّحْمَنِ اللَّهِ بِسْمِ
 * created by yussan 23 Oct 2016 18:29
 */

import { CALL_API } from '../../../store/middlewares/api'
import {
  RECEIVE_DATA,
  RECEIVE_MORE_DATA,
  REQUEST_DATA
} from '../../../store/consts'
import sealMiddleware from '../../helpers/seal'
import { objToQuery } from 'string-manager'

export function fetchBeritaDetail(id) {
  return {
    [CALL_API]: {
      method: 'get',
      url: `/api/news/${id}/${sealMiddleware.generateSeal()}`,
      target: 'berita_detail',
      typeWaiting: REQUEST_DATA,
      typeSuccess: RECEIVE_DATA,
      filter: id
    }
  }
}

export function fetchBerita(params = {}, filter) {
  return {
    [CALL_API]: {
      method: 'get',
      url: `/api/news/${sealMiddleware.generateSeal()}?${objToQuery(params)}`,
      target: 'berita_list',
      filter,
      typeSuccess: RECEIVE_DATA,
      typeWaiting: REQUEST_DATA
    }
  }
}

export function fetchBeritaMore(params = {}, filter) {
  return {
    [CALL_API]: {
      method: 'get',
      url: `/api/news/${sealMiddleware.generateSeal()}?${objToQuery(params)}`,
      target: 'berita_list',
      filter,
      typeSuccess: RECEIVE_MORE_DATA,
      typeWaiting: REQUEST_DATA
    }
  }
}

export function relatedBerita(encid) {
  return {
    [CALL_API]: {
      method: 'get',
      url: `/api/news/${sealMiddleware.generateSeal()}?notid=${encid}&limit=3`,
      target: 'berita_list',
      filter: `related_${encid}`,
      typeSuccess: RECEIVE_DATA,
      typeWaiting: REQUEST_DATA
    }
  }
}
