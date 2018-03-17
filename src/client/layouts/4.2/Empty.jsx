import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'

export default class Empty extends Component
{
    render()
    {
        return(
            <div>{ renderRoutes(this.props.route.routes) } </div>
        )
    }
}