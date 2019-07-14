import { combineReducers } from "redux"
import { pushData } from "../../../store/helpers/Mutations"
import { REQUEST_DATA, RECEIVE_DATA } from "../../../store/consts"
import * as Mutations from "../../../store/helpers/Mutations"
import {
  LIKE_COMPETITION,
  FETCH_COMPETITIONS,
  FETCH_MORE_COMPETITIONS,
  DELETE_ANNOUNCEMENT,
  ADD_ANNOUNCEMENT
} from "./actions"
import { alert } from "../../components/Alert"
import { today } from "../../helpers/DateTime"

function data(state = {}, action) {
  switch (action.type) {
    case FETCH_COMPETITIONS:
      return Mutations.receiveApiResponse(state, action)

    case FETCH_MORE_COMPETITIONS:
      state[action.filter].is_loading = true
      if (action.json && action.json.status) {
        state[action.filter].is_loading = false
        state[action.filter].message = action.json.message
        state[action.filter].status = action.json.status
        if (action.json.status === 200) {
          state.data = pushData(state[action.filter].data, action.json.data)
        }
      }
      return Object.assign({}, state)

    default:
      return state
  }
}

function detail(state = {}, action) {
  switch (action.type) {
    case ADD_ANNOUNCEMENT:
      return Mutations.updateDetailByFilter(state, action, n => {
        if (action.json && action.json.message) {
          alert(
            true,
            action.json.message,
            action.json.status == 200 ? "success" : "error"
          )
        } else {
          if(!n.data.announcement) n.data.announcement = []
          n.data.announcement.unshift({
            by: "admin",
            data: action.params.pengumuman,
            tgl: today("Y-m-d h:i:s")
          })
        }
      })

    case DELETE_ANNOUNCEMENT:
      return Mutations.updateDetailByFilter(state, action, n => {
        if (action.json && action.json.message) {
          alert(
            true,
            action.json.message,
            action.json.status == 200 ? "success" : "error"
          )
        }
        else {
          if (n.data.announcement && n.data.announcement.length > 0) {
            n.data.announcement.splice(action.params.key, 1)
          }
        }
      })

    case LIKE_COMPETITION:
      return Mutations.updateDetailByFilter(state, action, n => {
        // current like action description
        let actionLike

        if (action.json) {
          actionLike = action.json.liked

          // show alert after get response from api
          if (!actionLike)
            alert(true, "Kamu telah batal suka kompetisi", "warning")
          else alert(false)

          // only increase/reduce after get response from api
          n.data.stats.likes = n.data.stats.likes + (actionLike ? 1 : -1)
        } else {
          actionLike = !n.data.is_liked
        }

        n.data.is_liked = actionLike
      })

    case REQUEST_DATA:
      if (action.target === "kompetisi_detail") {
        return Mutations.requestListByFilter(state, action)
      }

      return state

    case RECEIVE_DATA:
      if (action.target === "kompetisi_detail") {
        return Mutations.receiveListByFilter(state, action)
      }

      return state

    default:
      return state
  }
}

function related(state = {}, action) {
  const { target, filter } = action
  switch (action.type) {
    case REQUEST_DATA:
      if (target === "kompetisi_related") {
        if (!state[filter]) state[filter] = {}
        state[filter].is_loading = true
        return Object.assign({}, state)
      }
      return state

    case RECEIVE_DATA:
      if (target === "kompetisi_related") {
        state[action.filter].is_loading = false
        state[action.filter] = action.json
        return Object.assign({}, state)
      }
      return state

    default:
      return state
  }
}

function categories(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      if (action.target === "kompetisi_categories") {
        return Object.assign({}, state, action.json)
      }
      return state

    default:
      return state
  }
}

function tags(state = {}, action) {
  if (action.target === "tags") {
    switch (action.type) {
      case REQUEST_DATA:
        return Object.assign({}, state, {
          [action.filter]: { is_loading: true }
        })

      case RECEIVE_DATA:
        return Object.assign(
          {},
          state,
          { [action.filter]: { is_loading: true } },
          { [action.filter]: action.json }
        )

      default:
        return state
    }
  }

  return state
}

function stats(state = {}, action) {
  if (action.target === "stats") {
    switch (action.type) {
      case REQUEST_DATA:
        return Object.assign({}, state, { is_loading: true })

      case RECEIVE_DATA:
        return Object.assign({}, state, { is_loading: false }, action.json)

      default:
        return state
    }
  }

  return state
}

const reducer = combineReducers({
  data,
  related,
  detail,
  categories,
  tags,
  stats
})
export default reducer
