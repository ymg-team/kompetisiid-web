import {requestApi} from '../../../store/helpers/ApiCaller'
import {POST_DATA, RECEIVE_DATA, RECEIVE_MORE_DATA, DELETE_DATA, REQUEST_DATA} from '../../../store/consts'
import {serialize} from '../../../server/helpers/url'
import {CALL_API} from '../../../store/middlewares/api'
import sealMiddleware from '../../helpers/seal'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export function fetchJelajah(params, filter) {
  const url = `/api/jelajah/${sealMiddleware.generateSeal()}`
  return {
    [CALL_API]: {
      typeSuccess: RECEIVE_DATA,
      typeWaiting: REQUEST_DATA,
      filter,
      method: 'get',
      target: 'kompetisi_jelajah',
      url: `${url}?${serialize(params)}`
    }
  }
}

export function fetchJelajahMore(params, filter) {
  const url = `/api/jelajah/${sealMiddleware.generateSeal()}`
  return {
    [CALL_API]: {
      typeSuccess: RECEIVE_MORE_DATA,
      typeWaiting: REQUEST_DATA,
      filter,
      method: 'get',
      target: 'kompetisi_jelajah',
      url: `${url}?${serialize(params)}`
    }
  }
}


export function getRelated(id, filter) {
  return {
    [CALL_API]: {
      typeSuccess: RECEIVE_DATA,
      typeWaiting: REQUEST_DATA,
      method: 'get',
      filter,
      target: 'kompetisi_related',
      url: `/api/kompetisi/related/${id}/${sealMiddleware.generateSeal()}`
    }
  }
}

export function getCategories() {
  return {
    [CALL_API]: {
      typeSuccess: RECEIVE_DATA,
      typeWaiting: REQUEST_DATA,
      method: 'get',
      target: 'kompetisi_categories',
      url: '/api/kompetisi/kategori'
    }
  }
}

export function setCategories(json) {
  return {
    type: RECEIVE_DATA,
    json,
    target: 'kompetisi_categories'
  }
}

export function getDetail(id) {
  return {
    [CALL_API]: {
      url: `/api/kompetisi/${id}/${sealMiddleware.generateSeal()}`,
      method: 'get',
      typeWaiting: REQUEST_DATA,
      typeSuccess: RECEIVE_DATA,
      target: 'kompetisi_detail',
      filter: id
    }
  }
}

// export function getPengumuman(id) {
//   return {
//     [CALL_API]: {
//       url: `/api/kompetisi/pengumuman/${id}/${sealMiddleware.generateSeal()}`,
//       method: 'get',
//       typeWaiting: REQUEST_DATA,
//       typeSuccess: RECEIVE_DATA,
//       target: 'kompetisi_pengumuman',
//       filter: id
//     }
//   }
// }

export function getFavoritedTags(params = {}) {
  return {
    [CALL_API]: {
      url: `/api/kompetisi/favoritedtags/${sealMiddleware.generateSeal()}`,
      method: 'get',
      typeWaiting: REQUEST_DATA,
      typeSuccess: RECEIVE_DATA,
      target: 'tags',
      filter: 'favorited'
    }
  }
}

export function getStats() {
  return {
    [CALL_API]: {
      url: `/api/stats/${sealMiddleware.generateSeal()}`,
      method: 'get',
      typeWaiting: REQUEST_DATA,
      typeSuccess: RECEIVE_DATA,
      target: 'stats',
    }
  }
}
