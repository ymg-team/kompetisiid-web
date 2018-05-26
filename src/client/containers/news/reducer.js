import {combineReducers} from 'redux'
import {RECEIVE_DATA, REQUEST_DATA, RECEIVE_MORE_DATA} from '../../../store/consts'
import {pushData} from '../../../store/helpers/Normalizer'

function data(state = {}, action)
{
    let nextstate = {}
    switch(action.type) {
        case REQUEST_DATA :
            if(action.target === 'berita_list')
            {
                nextstate = state
                if(!nextstate[action.filter]) nextstate[action.filter] = {}
                nextstate[action.filter].is_loading = true
                return Object.assign({}, state, nextstate)
            }

        case RECEIVE_DATA :
            if(action.target === 'berita_list')
            {
                state[action.filter].is_loading = false
                return Object.assign({}, state, {[action.filter] : action.json})
            }

        case RECEIVE_MORE_DATA :
            if(action.target === 'berita_list')
            {
                state[action.filter].is_loading = false
                nextstate = state
                nextstate[action.filter].status = action.json.status
                if(parseInt(action.json.status) === 200)
                {
                    nextstate.data = pushData(nextstate[action.filter].data, action.json.data)
                }
                return Object.assign({}, state, nextstate)
            }

        default :
            return state
    }
}

function detail(state = {}, action)
{
    let nextstate = {}
    const {target} = action
    switch(action.type)
    {
        case REQUEST_DATA :
            if(target === 'berita_detail')
            {
                nextstate = state
                if(!nextstate[action.filter]) nextstate[action.filter] = {}
                nextstate[action.filter].is_loading = true
                return Object.assign({}, state, nextstate)
            }
            return state

        case RECEIVE_DATA :
            if(target === 'berita_detail')
            {
                state[action.filter] = action.json
                state[action.filter].is_loading = false
                return Object.assign({}, state)
            }
            return state

        default :
            return state
    }
}


const reducer = combineReducers({
    data,
    detail
})
export default reducer
