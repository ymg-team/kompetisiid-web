import request from 'request'
import { httpException } from '../../store/helpers/Exceptions'
import * as Url from './url'
import fs from 'fs'
import Host from '../../config/host'
import Https from 'https'

const API_HOST = Host[process.env.NODE_ENV].api
// generate agent
const agent = new Https.Agent({
    rejectUnauthorized: false
})

/**
 * function to get data from API
 * @params (string) method, (string) endpoint, (object) params
 */
export function requestAPI(method='GET', endpoint='', params={}, callback)
{
    // TODO : change static token to dinamic token
    let token = ''
    if(params.token)
    {
        token = params.token
        delete params.token
    }

    //set query
    if(params.query)
    {
        endpoint = `${endpoint}?${Url.serialize(params.query)}`
        delete params.query
    }

    //set options
    var options = {
        method: method,
        uri: API_HOST+endpoint,
        timeout: 60000,
        // resolved from : https://stackoverflow.com/questions/20433287/node-js-request-cert-has-expired#answer-29397100
        agent,
        headers: {
            token,
            'Content-Type' : 'json',
        },
    }

    // using POST method
    if(method.toLowerCase() === 'post') {
        options.formData = params

        // upload files
        if(options.formData.files)
        {
            const files = options.formData.files
            delete options.formData.files

            Object.keys(files).map(n => {
                options.formData[n] = {
                    value: fs.createReadStream(files[n]._writeStream.path),
                    options: {
                        filename: files[n].name,
                        type: files[n].type
                    }
                }
            })
        }
    }


    //start request
    try {
        request( options , function(error, response, body){ 
            console.log(`response from ${options.uri}: `,body)

            if(error)
            {
                console.error('error endpoint :' + endpoint, error)
                return callback(httpException(500))
            } else //success
            {
                const json = isJSON(body)
                if(json) {
                    return callback(json)
                } else {
                    return callback(httpException(500, 'error response : json not valid'))
                }
            }
        })
    } catch(err) {
        return callback(httpException(500, 'error endpoint :' +endpoint+ ' ,'+ err.message+', '+err.stack))
    }
}

/**
 * function to get data from API version 2
 * using promise
 * @params (string) method, (string) endpoint, (object) params
 */
export function requestAPIV2(method='GET', endpoint='', params={})
{
    let token = ''
    if(params.token)
    {
        token = params.token
        delete params.token
    }

    //set query
    if(params.query)
    {
        endpoint = `${endpoint}?${Url.serialize(params.query)}`
        delete params.query
    }

    //set options
    var options = {
        method: method,
        uri: API_HOST.api+endpoint,
        timeout: 60000,
        agent,
        headers: {
            token,
            // 'Content-Type' : 'json',
        },
    }

    // using POST method
    if(method.toLowerCase() === 'post') {
        options.formData = params

        // upload files
        if(options.formData.files)
        {
            const {files} = options.formData
            delete options.formData.files

            Object.keys(files).map(n => {
                options.formData[n] = {
                    value: fs.createReadStream(files[n]._writeStream.path),
                    options: {
                        filename: files[n].name,
                        type: files[n].type
                    }
                }
            })
        }
    }


    //start request
    return new Promise((resolve, reject) => {
        try {
            request( options , function(error, response, body){
                console.log(`response from ${options.uri}: `,body)

                if(error)
                {
                    console.error('error endpoint :' + endpoint, error)
                    return resolve(httpException(500))
                } else //success
                {
                    if(params.resType === 'json') {
                        const json = isJSON(body)
                        if(json)
                            return resolve({body:json, statusCode: response.statusCode})
                    }
                        
                    return resolve({body, statusCode: response.statusCode})
                }
            })
        } catch(err) {
            return resolve(httpException(500, 'error endpoint :' +endpoint+ ' ,'+ err.message+', '+err.stack))
        }
    })
}


function isJSON(str) {
    if(typeof str !== 'string') {
        return false
    } else {
        try {
            const json = JSON.parse(str)
            return json
        } catch (e) {
            return false
        }
    }
}