import {
  REQUEST_SEND_COMPETITION,
  ACTION_SEND_COMPETITION,
  REQUEST_MORE_SEND_COMPETITION
} from "./actions"
import * as Mutations from "../../../../store/helpers/Mutations"
import * as Selector from "./selectors"
import { combineReducers } from "redux"

function list(state = {}, action = {}) {
  switch (action.type) {
    case REQUEST_SEND_COMPETITION:
      return Mutations.receiveData(state, action)

    case REQUEST_MORE_SEND_COMPETITION:
      return Mutations.receiveMoreListByFilter(state, action)

    case ACTION_SEND_COMPETITION:
      return Mutations.updateListbyId(
        state,
        action,
        action.params,
        Selector.updateStatus
      )

    default:
      return state
  }
}

export default combineReducers({
  list
})
