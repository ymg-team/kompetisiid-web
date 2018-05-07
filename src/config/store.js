import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import apiMiddleware from '../store/middlewares/api' 
import createLogger from 'redux-logger'

// reducers
import Kompetisi from '../client/containers/competition/reducer'
import Berita from '../store/berita/reducer'
import Pasang from '../store/pasang/reducer'
import User from '../store/user/reducer'

let Middlewares

if(process.env.NODE_ENV == 'production' || typeof window == 'undefined')
{
  Middlewares = applyMiddleware(apiMiddleware, thunkMiddleware)
}else
{
  Middlewares = applyMiddleware(apiMiddleware, createLogger(), thunkMiddleware)
}

const Reducers = combineReducers({
  Kompetisi,
  Berita,
  Pasang,
  User
})

const preloadedState = typeof window != 'undefined' ? window.__data__ : {}

export default createStore(
        Reducers,
        preloadedState,
        Middlewares
    )

