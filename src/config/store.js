import { createStore, applyMiddleware } from 'redux'
import apiMiddleware from '../store/middlewares/api'
import Reducers from '../store/combineReducers'

let Middlewares

if (process.env.NODE_ENV == 'production' || typeof window == 'undefined') {
  Middlewares = applyMiddleware(apiMiddleware)
} else {
  const createLogger = require('redux-logger')
  Middlewares = applyMiddleware(apiMiddleware, createLogger())
}

const preloadedState = typeof window != 'undefined' ? window.__data__ : {}

export default createStore(Reducers, preloadedState, Middlewares)
