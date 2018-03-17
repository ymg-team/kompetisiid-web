import React from 'react'
import { renderRoutes } from 'react-router-config'

export default (props) => {
  return renderRoutes(props.route.routes)
}