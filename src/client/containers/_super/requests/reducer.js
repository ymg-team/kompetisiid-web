import {
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_MORE_DATA
} from '../../../../store/consts' 

export default (state = {}, action = {}) => {
  switch(action.type) {
    case REQUEST_DATA:
      if (action.target === 'request_kompetisi') {
        if (!state[action.filter]) state[action.filter] = {}
        state[action.filter].is_loading = true
        return Object.assign({}, state)
      }

      return state

    case RECEIVE_DATA:
      if (action.target === 'request_kompetisi') {
        state[action.filter] = action.json
        state[action.filter].is_loading = false
        return Object.assign({}, state)
      }

      return state
      
    case RECEIVE_MORE_DATA:
      return state

    default:
      return state
  }
}
