import express from 'express'
import render from './render'
import path from 'path'
const App = express()

App.use((req, res, next) => {
    next()
})

App.use('/assets', express.static(path.resolve(__dirname, '../../../assets/')))

App.get('*', render)

export default App