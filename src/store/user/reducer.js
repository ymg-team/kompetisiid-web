/**
 * Created by yussan on 28/01/17.
 */

import {combineReducers} from 'redux'
import {setToLoading, receiveData} from '../helpers/Normalizer'
import {REQUEST_DATA, RECEIVE_DATA} from '../consts'

function profile(state={}, action)
{
    if(action.target === 'user_profile')
    {
        switch(action.type)
        {
            case REQUEST_DATA :
                return setToLoading(state, action)

            case RECEIVE_DATA :
                return receiveData(state, action)
                
            default :
                return state
        }
    }

    return state
}

function login(state={}, action)
{
    if(action.target === 'user_login')
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
    }

    if(action.target === 'user_logout') return {}

    return state
}

function register(state={}, action)
{
    if(action.target === 'user_register')
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
    }

    return state
}

function logout(state={}, action)
{
    if(action.target === 'user_logout')
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
    }

    return state
}

function session(state={}, action)
{
    return state
}

function email_verification(state={}, action)
{
    if(action.target === 'user_email_verification')
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
    }

    return state
}

const reducer = combineReducers({
    profile,
    login,
    register,
    logout,
    session,
    email_verification
})
export default reducer
