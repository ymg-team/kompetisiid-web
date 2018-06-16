import {
  REQUEST_DATA,
  RECEIVE_DATA,
  RECEIVE_MORE_DATA
} from '../../../../store/consts'
import * as Mutations from '../../../../store/helpers/Mutations'
import * as Selector from './selectors'

export default (state = {}, action = {}) => {
  switch (action.type) {
    // request data from api
    case REQUEST_DATA:
      if (action.target === 'request_kompetisi') {
        return Mutations.requestListByFilter(state, action)
      }

      // request action data from api
      if (action.target === 'action_request_kompetisi') {
        return Mutations.updateListbyId(state, action, action.params, Selector.updateStatus)
      }

      return state

    case RECEIVE_DATA:
      // receive data from api
      if (action.target === 'request_kompetisi') {
        return Mutations.receiveListByFilter(state, action)
      }

      // request action data from api
      if (action.target === 'action_request_kompetisi') {
        return Mutations.updateListbyId(state, action, action.params, Selector.updateStatus)
      }

      return state

    case RECEIVE_MORE_DATA:
      return state

    default:
      return state
  }
}
