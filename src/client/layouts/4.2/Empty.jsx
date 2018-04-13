import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'

export default props => <div>{renderRoutes(props.route.routes)}</div>
