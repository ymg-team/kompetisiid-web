import React from "react"
import { connect } from "react-redux"

// components
import Helmet from "react-helmet"
import CountBox from "../../components/boxs/_super/CountBox"
import Loader from "../../components/boxs/GlobalLoader"
import HeaderDashboard from "../../components/cards/HeaderDashboard"

const Dashboard = props => {
  const { stats } = props
  return (
    <React.Fragment>
      <Helmet title="Dashboard - Kompetisi Id" />
      <div className="row" style={{ margin: "0 -15px" }}>
        <div className="col-md-12">
          <HeaderDashboard
            title="Kompetisi"
            text="Berikut adalah data yang berhubungan dengan kamu dan kompetisi di Kompetisi Id"
          />
        </div>

        {!stats.is_loading && stats.status == 200 ? (
          <React.Fragment>
            {/* waiting count */}
            <div style={{ marginTop: 20 }} className="col-md-3 col-xs-6">
              <CountBox
                count={stats.competition.waiting || 0}
                text="Menunggu"
                link="/dashboard/competition/waiting"
              />
            </div>

            {/* live competition */}
            <div style={{ marginTop: 20 }} className="col-md-3 col-xs-6">
              <CountBox
                count={stats.competition.live || 0}
                text="Berlangsung"
                link="/dashboard/competition/live"
              />
            </div>

            {/* published competition */}
            <div style={{ marginTop: 20 }} className="col-md-3 col-xs-6">
              <CountBox
                count={stats.competition.posted || 0}
                text="Terpublikasi"
                link="/dashboard/competition/posted"
              />
            </div>

            {/* rejected competition */}
            <div style={{ marginTop: 20 }} className="col-md-3 col-xs-6">
              <CountBox
                count={stats.competition.rejected || 0}
                text="DiTolak"
                link="/dashboard/competition/rejected"
              />
            </div>
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    stats: state.Others.count_super_sidebar || {}
  }
}

export default connect(mapStateToProps)(Dashboard)
