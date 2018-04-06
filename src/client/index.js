import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import '!style-loader!css-loader!./index.css'

import store from '../config/store'

const App = () => (
    <BrowserRouter> 
        <Provider store={store}>
            { renderRoutes(Routes) }
        </Provider>
    </BrowserRouter>  
)

ReactDOM.hydrate(<App title="Judul" />, document.getElementById('root'))