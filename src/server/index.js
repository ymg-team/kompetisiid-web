import App from './app'
const Port = process.env.KI_PORT || 1470

//start server
App.listen(Port, () => {
    console.log('Server is listening on port: ' + Port)
})
