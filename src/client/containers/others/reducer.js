import { CREATE_COMPETITION } from "../competition/actions"
import { CREATE_NEWS } from "../news/actions"
import { FETCH_COUNT_SUPER_SIDEBAR } from "../../../store/user/actions"
import { SETTING_PROFILE } from "../_settings/actions"
import { FORGOT_PASSWORD, CHANGE_PASSWORD } from "../../../store/user/actions"
import { receiveApiResponse } from "../../../store/helpers/Mutations"

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMPETITION:
    case CREATE_NEWS:
    case FETCH_COUNT_SUPER_SIDEBAR:
    case SETTING_PROFILE:
    case FORGOT_PASSWORD:
    case CHANGE_PASSWORD:
      return receiveApiResponse(state, action)
    default:
      return state
  }
}
