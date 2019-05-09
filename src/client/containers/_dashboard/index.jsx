import React from "react"
import { connect } from "react-redux"

// components
import Helmet from "react-helmet"
import CountBox from "../../components/boxs/_super/CountBox"
import Loader from "../../components/boxs/GlobalLoader"
import HeaderDashboard from "../../components/cards/HeaderDashboard"

class Dashboard extends React.Component {
  render = () => {
    const { stats } = this.props
    console.log("stats", stats)
    return (
      <React.Fragment>
        <Helmet title="Dashboard - Kompetisi Id" />
        <div className="row">
          <div className="col-md-12">
            <HeaderDashboard
              title="Kompetisi"
              text="Berikut adalah data yang berhubungan dengan kamu dan kompetisi di Kompetisi Id"
            />
          </div>

          {!stats.is_loading && stats.status == 200 ? (
            <React.Fragment>
              {/* waiting count */}
              <div style={{ marginTop: 20 }} className="col-md-3">
                <CountBox
                  count={stats.competition.waiting || 0}
                  text="Menunggu di Terima"
                  link="/dashboard/competition/waiting"
                />
              </div>

              {/* live competition */}
              <div style={{ marginTop: 20 }} className="col-md-3">
                <CountBox
                  count={stats.competition.live || 0}
                  text="Sedang Berlangsung"
                  link="/dashboard/competition/live"
                />
              </div>

              {/* published competition */}
              <div style={{ marginTop: 20 }} className="col-md-3">
                <CountBox
                  count={stats.competition.posted || 0}
                  text="Terpublikasi"
                  link="/dashboard/competition/posted"
                />
              </div>

              {/* rejected competition */}
              <div style={{ marginTop: 20 }} className="col-md-3">
                <CountBox
                  count={stats.competition.rejected || 0}
                  text="Kompetisi di Tolak"
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
}

const mapStateToProps = state => {
  return {
    stats: state.Others.count_super_sidebar || {}
  }
}

export default connect(mapStateToProps)(Dashboard)
