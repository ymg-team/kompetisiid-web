import React, { Component } from "react"
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

class SuperLayout extends Component {
  handleLogout() {
    fullPageLoader(true)
    this.props.dispatch(logout())
    setTimeout(() => {
      alert(true, "Kamu telah logout", "success")
      location.href = "/_super"
    }, 2000)
  }

  componentDidMount() {
    // request count data of _super sidebar
    this.props.dispatch(fetchCountSuperSidebar())
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="row m-t-2em">
          <div className="col-md-3 col-sm-12">
            <Sidebar
              handleLogout={() => this.handleLogout()}
              stats={this.props.stats}
            />
          </div>
          <div className="col-md-7 col-sm-12">
            {renderRoutes(this.props.route.routes)}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stats: state.Others.count_super_sidebar || {}
  }
}

export default connect(mapStateToProps)(SuperLayout)
