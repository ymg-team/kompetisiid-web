#!/usr/bin/env node

import App from './app'
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
    App.listen(Port, () => {
        console.log('Server is listening on port: ' + Port)
    })
}