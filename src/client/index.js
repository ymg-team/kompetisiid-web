import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import './sass/index.sass'

import store from '../config/store'

const App = () => (
    <BrowserRouter> 
        <Provider store={store}>
            { renderRoutes(Routes) }
        </Provider>
    </BrowserRouter>  
)

ReactDOM.hydrate(<App />, document.getElementById('root'))