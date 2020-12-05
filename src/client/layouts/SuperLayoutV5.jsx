import React, { useEffect } from "react"
import Loadable from "react-loadable"
import { alert } from "../components/Alert"
import { fullPageLoader } from "../components/preloaders/FullPage"
import { logout } from "../../store/user/actions"
import { connect } from "react-redux"
import { fetchCountSuperSidebar } from "../../store/user/actions"

// components
import Loading from "../components/preloaders/GlobalLoader"
import { renderRoutes } from "react-router-config"

const Sidebar = Loadable({
  loader: () => import("../components/navigations/_super/Sidebar"),
  loading: Loading
})

const SuperLayout = props => {
  useEffect(() => {
    props.dispatch(fetchCountSuperSidebar())
  }, [])

  const handleLogout = () => {
    fullPageLoader(true)
    props.dispatch(logout())
    setTimeout(() => {
      alert(true, "Kamu telah logout", "success")
      location.href = "/super"
    }, 2000)
  }

  return (
    <div className="container">
      <div className="row m-t-2em">
        <div className="col-md-3 col-sm-12">
          <Sidebar handleLogout={() => handleLogout()} stats={props.stats} />
        </div>
        <div className="col-md-9 col-sm-12">
          {renderRoutes(props.route.routes)}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    stats: state.Others.count_super_sidebar || {}
  }
}

export default connect(mapStateToProps)(SuperLayout)
