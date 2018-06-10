import React, { Component } from 'react'
import Loadable from 'react-loadable'

// components
import Loading from '../components/preloaders/GlobalLoader'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { Link } from 'react-router-dom'

const Sidebar = Loadable({
  loader: () => import('../components/navigations/SidebarSuper'),
  loading: Loading
})

export default class Dashboard extends Component {
  render() {
    return (
      <div className="col-md-12">
        <div className="row m-t-2em">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            {renderRoutes(this.props.route.routes)}
          </div>
        </div>
      </div>
    )
  }
}
