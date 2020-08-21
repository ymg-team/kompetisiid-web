import React, { useEffect } from "react"
import Loadable from "react-loadable"
import { alert } from "../components/Alert"
import { logout } from "../../store/user/actions"
import { fullPageLoader } from "../components/preloaders/FullPage"
import { connect } from "react-redux"
import { fetchCountDashboardSidebar } from "../../store/user/actions"

// components
import Loading from "../components/preloaders/FullContentLoader"
import { renderRoutes } from "react-router-config"

const Sidebar = Loadable({
  loader: () => import("../components/navigations/_dashboard/Sidebar"),
  loading: Loading
})

const DashboardLayoutV5 = props => {
  useEffect(() => {
    props.dispatch(fetchCountDashboardSidebar())
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

export default connect(mapStateToProps)(DashboardLayoutV5)
