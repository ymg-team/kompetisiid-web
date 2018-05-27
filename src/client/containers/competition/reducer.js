import { combineReducers } from 'redux'
import { pushData } from '../../../store/helpers/Normalizer'
import { RECEIVE_CATEGORIES } from './actions'
import {
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_MORE_DATA
} from '../../../store/consts'

function data(state = {}, action) {
  let nextstate = {}
  const { target, filter } = action
  switch (action.type) {
    case REQUEST_DATA:
      nextstate = state

      if (action.target === 'kompetisi_jelajah') {
        if (!nextstate[action.filter]) nextstate[action.filter] = {}
        nextstate[action.filter].is_loading = true
        return Object.assign({}, state, nextstate)
      }

      return state

    case RECEIVE_DATA:
      if (target === 'kompetisi_jelajah') {
        state[filter] = action.json
        state[filter].is_loading = false
        return Object.assign({}, state)
      }
      return state

    case RECEIVE_MORE_DATA:
      if (action.target === 'kompetisi_jelajah') {
        state[action.filter].is_loading = false
        nextstate = state
        nextstate[action.filter].message = action.json.message
        nextstate[action.filter].status = action.json.status
        if (action.json.status === 200) {
          nextstate.data = pushData(
            nextstate[action.filter].data,
            action.json.data
          )
        }
        return Object.assign({}, state, nextstate)
      }

    default:
      return state
  }
}

function detail(state = {}, action) {
  switch (action.type) {
    case REQUEST_DATA:
      if (action.target === 'kompetisi_detail') {
        if (!state[action.filter]) state[action.filter] = {}
        state[action.filter].is_loading = true
        return Object.assign({}, state)
      }

    case RECEIVE_DATA:
      if (action.target === 'kompetisi_detail') {
        state[action.filter].is_loading = false
        state[action.filter] = action.json
        return Object.assign({}, state)
      }

    default:
      return state
  }
}

function related(state = {}, action) {
  const { target, filter } = action
  switch (action.type) {
    case REQUEST_DATA:
      if (target === 'kompetisi_related') {
        if (!state[filter]) state[filter] = {}
        state[filter].is_loading = true
        return Object.assign({}, state)
      }
      return state

    case RECEIVE_DATA:
      if (target === 'kompetisi_related') {
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
      if (action.target === 'kompetisi_categories') {
        return Object.assign({}, state, action.json)
      }
      return state

    default:
      return state
  }
}

function pengumuman(state = {}, action) {
  const { target, filter } = action
  switch (action.type) {
    case REQUEST_DATA:
      if (target === 'kompetisi_pengumuman') {
        if (!state[filter]) state[filter] = {}
        state[filter].is_loading = true
        return Object.assign({}, state)
      }
      return state

    case RECEIVE_DATA:
      if (target === 'kompetisi_pengumuman') {
        state[filter].is_loading = false
        state[filter] = action.json
        return Object.assign({}, state)
      }
      return state

    default:
      return state
  }
}

function tags(state = {}, action) {
  if (action.target === 'tags') {
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
  if (action.target === 'stats') {
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
  pengumuman,
  tags,
  stats
})
export default reducer
