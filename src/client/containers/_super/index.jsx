import React, { Component } from "react"
import { connect } from "react-redux"

// components
import Helmet from "../../components/Helmet"
import CountBox from "../../components/boxs/_super/CountBox"
import Loader from "../../components/boxs/GlobalLoader"
import HeaderDashboard from "../../components/cards/HeaderDashboard"

class SuperContainer extends Component {
  render() {
    const { stats } = this.props
    console.log("stats", stats)
    return (
      <React.Fragment>
        <Helmet title="Super - Kompetisi Id" />
        <div className="row">
          <div className="col-md-12">
            <HeaderDashboard
              title="Kompetisi"
              text="Seluruh data kompetisi di Kommpetisi Id"
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    stats: state.Others.count_super_sidebar || {}
  }
}

export default connect(mapStateToProps)(SuperContainer)
