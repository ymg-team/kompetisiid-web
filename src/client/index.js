import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import Routes from './routes'
import {Provider} from 'react-redux'

import store from '../config/store'

browserHistory.listen((location) => {
    if(window.ga) window.ga('send', 'pageview', location.pathname)
})

const App = () => (
    <Provider store={store}>
        <Router children={Routes} history={browserHistory} />
    </Provider>
)

ReactDOM.render(<App title="Judul" />, document.getElementById('root'))