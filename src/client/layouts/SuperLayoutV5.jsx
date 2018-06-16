import React, { Component } from 'react'
import Loadable from 'react-loadable'
import { alert } from '../components/Alert'
import { fullPageLoader } from '../components/preloaders/FullPage'
import { logout } from '../../store/user/actions'
import { connect } from 'react-redux'

// components
import Loading from '../components/preloaders/GlobalLoader'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { Link } from 'react-router-dom'

const Sidebar = Loadable({
  loader: () => import('../components/navigations/SidebarSuper'),
  loading: Loading
})

class SuperLayout extends Component {

  handleLogout(){
    fullPageLoader(true)
    this.props.dispatch(logout())
    setTimeout(() => {
      alert(true, 'Kamu telah logout', 'success')
      location.href="/super"
    }, 2000)
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="row m-t-2em">
          <div className="col-md-2">
            <Sidebar handleLogout={() => this.handleLogout()} />
          </div>
          <div className="col-md-10">
            {renderRoutes(this.props.route.routes)}
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch)
{
    return {
        dispatch
    }
}

export default connect(mapDispatchToProps)(SuperLayout)
