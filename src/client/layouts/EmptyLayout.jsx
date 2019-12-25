import React from 'react'
import { renderRoutes } from 'react-router-config'

export default props => <React.Fragment>{renderRoutes(props.route.routes)}</React.Fragment>
