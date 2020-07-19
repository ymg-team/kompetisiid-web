import React from "react"
import { connect } from "react-redux"

// components
import Helmet from "../../components/Helmet"
import CountBox from "../../components/boxs/_super/CountBox"
import Loader from "../../components/boxs/GlobalLoader"
import HeaderDashboard from "../../components/cards/HeaderDashboard"

const SuperContainer = props => {
  const { stats } = props
  return (
    <React.Fragment>
      <Helmet title="Super - Kompetisi Id" />
      <div className="row">
        <div className="col-md-12">
          <HeaderDashboard
            title="Kompetisi"
            text="Seluruh data kompetisi di Kompetisi Id"
          />
        </div>
        {!stats.is_loading && stats.status == 200 ? (
          <React.Fragment>
            {/* waiting count */}
            <div style={{ marginBottom: 20 }} className="col-md-3 col-xs-6">
              <CountBox
                count={stats.competition.waiting || 0}
                text="Menunggu"
                link="/super/competition/waiting"
              />
            </div>

            {/* live competition */}
            <div style={{ marginBottom: 20 }} className="col-md-3 col-xs-6">
              <CountBox
                count={stats.competition.live || 0}
                text="Sedang Berlangsung"
                link="/super/competition/live"
              />
            </div>

            {/* published competition */}
            <div style={{ marginBottom: 20 }} className="col-md-3 col-xs-6">
              <CountBox
                count={stats.competition.posted || 0}
                text="Terpublikasi"
                link="/super/competition/posted"
              />
            </div>

            {/* rejected competition */}
            <div style={{ marginBottom: 20 }} className="col-md-3 col-xs-6">
              <CountBox
                count={stats.competition.rejected || 0}
                text="DiTolak"
                link="/super/competition/rejected"
              />
            </div>
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </div>

      <div className="row">
        <div className="col-md-12">
          <HeaderDashboard title="Kabar" text="Seluruh kabar di Kompetisi Id" />
        </div>
        {!stats.is_loading && stats.status == 200 ? (
          <React.Fragment>
            {/* draft count */}
            <div style={{ marginBottom: 20 }} className="col-md-3 col-xs-6">
              <CountBox
                count={stats.news.draft || 0}
                text="Draft"
                link="/super/news"
              />
            </div>

            {/* posted competition */}
            <div style={{ marginBottom: 20 }} className="col-md-3 col-xs-6">
              <CountBox
                count={stats.news.posted || 0}
                text="Dipublikasi"
                link="/super/news"
              />
            </div>
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </div>

      <div className="row">
        <div className="col-md-12">
          <HeaderDashboard
            title="User"
            text="Seluruh data Userdi Kompetisi Id"
          />
        </div>
        {!stats.is_loading && stats.status == 200 ? (
          <React.Fragment>
            <div style={{ marginBottom: 20 }} className="col-md-3 col-xs-6">
              <CountBox
                count={stats.members.verified || 0}
                text="Verifikasi"
                link="/super/users/confirmed"
              />
            </div>

            <div style={{ marginBottom: 20 }} className="col-md-3 col-xs-6">
              <CountBox
                count={stats.members.unverified || 0}
                text="Belum Verifikasi"
                link="/super/users/unconfirmed"
              />
            </div>

            <div style={{ marginBottom: 20 }} className="col-md-3 col-xs-6">
              <CountBox
                count={stats.members.banned || 0}
                text="Dicekal"
                link="/super/users/banned"
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

export default connect(mapStateToProps)(SuperContainer)
