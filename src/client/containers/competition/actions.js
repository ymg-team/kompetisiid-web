import {
  RECEIVE_DATA,
  RECEIVE_MORE_DATA,
  REQUEST_DATA
} from "../../../store/consts"
import { CALL_API } from "../../../store/middlewares/api"
import sealMiddleware from "../../helpers/seal"
import { objToQuery } from "string-manager/dist/modules/httpquery"

export const FETCH_COMPETITIONS = "FETCH_COMPETITIONS"
export const FETCH_MORE_COMPETITIONS = "FETCH_MORE_COMPETITIONS"
export const FETCH_CATEGORIES = "FETCH_CATEGORIES"
export const CREATE_COMPETITION = "CREATE_COMPETITION"
export const LIKE_COMPETITION = "LIKE_COMPETITION"
export const DELETE_ANNOUNCEMENT = "DELETE_ANNOUNCEMENT"
export const ADD_ANNOUNCEMENT = "ADD_ANNOUNCEMENT"
export const SUBSCRIBE_COMPETITION = "SUBSCRIBE_COMPETITION"

/**
 * @description function to subscribe / unsubscribe competition
 * @param {number} competition_id  , id of competition
 */
export function subscribeCompetition(competition_id) {
  return {
    [CALL_API]: {
      method: "post",
      type: SUBSCRIBE_COMPETITION,
      filter: competition_id,
      url: `/api/kompetisi/competition-subscription/${sealMiddleware.generateSeal()}`,
      params: {
        competition_id
      }
    }
  }
}

/**
 * @description function to add competitoin announcement 
 * @param {string} params.announcement  
 * @param {competition_id} params.competition_id  
 */
export function addAnnouncement(params={}) {
  return {
    [CALL_API]: {
      method: "post",
      url: `/api/kompetisi/announcement/${params.competition_id}/${sealMiddleware.generateSeal()}`,
      filter: params.competition_id,
      type: ADD_ANNOUNCEMENT,
      params: {
        pengumuman: params.pengumuman,
        user: params.user
      }
    }
  }
}

/**
 * @description function to delete competition announcement by key and competition id
 * @param {number} params.announcement_key 
 * @param {number} params.competition_id 
 */
export function deleteAnnouncement(params={}) {
  return {
    [CALL_API]: {
      method: "delete",
      url: `/api/kompetisi/announcement/${params.competition_id}/${sealMiddleware.generateSeal()}`,
      filter: params.competition_id,
      type: DELETE_ANNOUNCEMENT,
      params: {
        key: params.key
      }
    }
  }
}

/**
 * @description function to create new competition
 * @param {Object} params
 */
export function createCompetition(params = {}) {
  return {
    [CALL_API]: {
      type: CREATE_COMPETITION,
      url: `/api/kompetisi/${sealMiddleware.generateSeal()}`,
      method: "post",
      filter: "competition_form",
      params
    }
  }
}

/**
 * @description function to update competition by id
 * @param {Object} params
 */
export function updateCompetition(params = {}, id) {
  return {
    [CALL_API]: {
      type: CREATE_COMPETITION,
      url: `/api/kompetisi/${id}/${sealMiddleware.generateSeal()}`,
      method: "put",
      filter: "competition_form",
      params
    }
  }
}

export function fetchJelajah(params = {}, filter) {
  const url = `/api/jelajah/${sealMiddleware.generateSeal()}`
  return {
    [CALL_API]: {
      type: FETCH_COMPETITIONS,
      filter,
      method: "get",
      url: `${url}?${objToQuery(params)}`
    }
  }
}

export function fetchLikedCompetition(params = {}, filter) {
  return {
    [CALL_API]: {
      type: params.lastid ? FETCH_MORE_COMPETITIONS : FETCH_COMPETITIONS,
      filter,
      method: "get",
      url: `/api/kompetisi/liked/${sealMiddleware.generateSeal()}?${objToQuery(
        params
      )}`
    }
  }
}

export function fetchJelajahMore(params, filter) {
  const url = `/api/jelajah/${sealMiddleware.generateSeal()}`
  return {
    [CALL_API]: {
      type: FETCH_MORE_COMPETITIONS,
      filter,
      method: "get",
      url: `${url}?${objToQuery(params)}`
    }
  }
}

export function getRelated(id, filter) {
  return {
    [CALL_API]: {
      typeSuccess: RECEIVE_DATA,
      typeWaiting: REQUEST_DATA,
      method: "get",
      filter,
      target: "kompetisi_related",
      url: `/api/kompetisi/related/${id}/${sealMiddleware.generateSeal()}`
    }
  }
}

export function getCategories() {
  return {
    [CALL_API]: {
      typeSuccess: RECEIVE_DATA,
      typeWaiting: REQUEST_DATA,
      method: "get",
      target: "kompetisi_categories",
      url: "/api/kompetisi/kategori"
    }
  }
}

export function setCategories(json) {
  return {
    type: RECEIVE_DATA,
    json,
    target: "kompetisi_categories"
  }
}

export function getDetail(id) {
  return {
    [CALL_API]: {
      url: `/api/kompetisi/${id}/${sealMiddleware.generateSeal()}`,
      method: "get",
      typeWaiting: REQUEST_DATA,
      typeSuccess: RECEIVE_DATA,
      target: "kompetisi_detail",
      filter: id
    }
  }
}

export function getFavoritedTags(params = {}) {
  return {
    [CALL_API]: {
      url: `/api/kompetisi/favoritedtags/${sealMiddleware.generateSeal()}`,
      method: "get",
      typeWaiting: REQUEST_DATA,
      typeSuccess: RECEIVE_DATA,
      target: "tags",
      filter: "favorited"
    }
  }
}

export function likeActionCompetition(competition_id = {}) {
  return {
    [CALL_API]: {
      type: LIKE_COMPETITION,
      params: { competition_id },
      filter: competition_id,
      method: "post",
      url: `/api/kompetisi/like/${competition_id}/${sealMiddleware.generateSeal()}`
    }
  }
}
