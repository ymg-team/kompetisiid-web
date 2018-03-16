import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import store from '../config/store'

// browserHistory.listen((location) => {
//     if(window.ga) window.ga('send', 'pageview', location.pathname)
// })

const App = () => (
    <BrowserRouter> 
        <Provider store={store}>
            { renderRoutes(Routes) }
        </Provider>
    </BrowserRouter>  
)

ReactDOM.hydrate(<App title="Judul" />, document.getElementById('root'))