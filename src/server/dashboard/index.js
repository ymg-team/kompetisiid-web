import express from 'express'
const App = express()

App.use((req, res) => {
    return res.end('berhasil')
})