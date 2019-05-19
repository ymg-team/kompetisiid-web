/**
 * Created by yussan on 13/11/16.
 */
import {combineReducers} from 'redux'
import {setToLoading} from '../../../store/helpers/Mutations'
import {REQUEST_DATA, RECEIVE_DATA} from '../../../store/consts'

function cepat(state={}, action)
{
  if(action.target === 'pasang_cepat')
  {
    switch(action.type)
    {
    case REQUEST_DATA :
      state.is_loading = true
      return Object.assign({}, state)

    case RECEIVE_DATA :
      state.is_loading = false
      return Object.assign({}, state, action.json)

    default :
      return state
    }
  }else
  {
    return state
  }
}

function komplit(state={}, action)
{
  if(action.target === 'pasang_komplit')
  {
    switch(action.type)
    {
    case REQUEST_DATA :
      return setToLoading(state, action)

    case RECEIVE_DATA :
      return state

    default :
      return state
    }
  }else
  {
    return state
  }
}

const reducer = combineReducers({
  cepat, komplit
})
export default reducer
