import { combineReducers } from "redux"
import { pushData } from "../../../store/helpers/Mutations"
import {
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_MORE_DATA
} from "../../../store/consts"
import * as Mutations from "../../../store/helpers/Mutations"
import { LIKE_COMPETITION } from "./actions"
import {alert} from "../../components/Alert"

function data(state = {}, action) {
  let nextstate = {}
  const { target, filter } = action
  switch (action.type) {
    case REQUEST_DATA:
      nextstate = state

      if (action.target === "kompetisi_jelajah") {
        return Mutations.requestListByFilter(state, action)
      }

      return state

    case RECEIVE_DATA:
      if (target === "kompetisi_jelajah") {
        return Mutations.receiveListByFilter(state, action)
      }

      return state

    case RECEIVE_MORE_DATA:
      if (action.target === "kompetisi_jelajah") {
        state[action.filter].is_loading = false
        state[action.filter].message = action.json.message
        state[action.filter].status = action.json.status
        if (action.json.status === 200) {
          state.data = pushData(state[action.filter].data, action.json.data)
        }
        return Object.assign({}, state)
      }

    default:
      return state
  }
}

function detail(state = {}, action) {
  switch (action.type) {

    case LIKE_COMPETITION:

      return Mutations.updateDetailByFilter(state, action , n => {
        // current like actino description
        const actionLike = !n.data.is_liked
        
        // show / hide alert
        if(!actionLike) alert(true, "Kamu batal suka kompetisi ini", "warning")
        else alert(false)

        n.data.is_liked = actionLike 
        n.data.stats.likes = n.data.stats.likes + (actionLike ? 1 : -1)
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
