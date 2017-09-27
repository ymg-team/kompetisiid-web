#!/usr/bin/env node

import App from './app'
import Http from 'http'
import Cluster from 'cluster'
const Port = process.env.KI_PORT || 1470

if(Cluster.isMaster && process.env.NODE_ENV === 'production')
{
    const NumWorkers = require('os').cpus().length
    console.log(`Master cluster setting up ${NumWorkers} workers`)

    for(var i=0; i < NumWorkers; i++)
    {
        Cluster.fork()
    }

    Cluster.on('online', worker => {
        console.log(`Worker ${worker.process.pid} is online`)
    })

    Cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal} `)
        console.log('Starting new worker')
        Cluster.fork()
    })
}else
{
    //start server
    App.set('port', Port)

    const Server = Http.createServer(App)

    Server.listen(Port)
    Server.on('error', onError)
    Server.on('listening', onListening)

    function onError(error){
        console.log(error)

        if (error.syscall !== 'listen') {
            throw error
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + Port
            : 'Port ' + Port

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges')
                process.exit(1)
                break
            case 'EADDRINUSE':
                console.error(bind + ' is already in use')
                process.exit(1)
                break
            default:
                throw error
        } 

    }

    function onListening() {
        var addr = Server.address()
        var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
        console.log('Listening on ' + bind)
    }
    
}