import { combineReducers } from "redux"
import { CREATE_COMPETITION } from "../competition/actions"
import { receiveApiResponse } from "../../../store/helpers/Normalizer"

export default (state = {}, action) => {

  switch(action.type) {
    case CREATE_COMPETITION:
      return receiveApiResponse(state, action)
    default: 
      return state
  }
}