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
              text="Seluruh data kompetisi di Kompetisi Id"
            />
          </div>
          {!stats.is_loading && stats.status == 200 ? (
            <React.Fragment>
              {/* waiting count */}
              <div style={{ marginBottom: 20 }} className="col-md-3">
                <CountBox
                  count={stats.competition.waiting || 0}
                  text="Menunggu"
                  link="/super/competition/waiting"
                />
              </div>

              {/* live competition */}
              <div style={{ marginBottom: 20 }} className="col-md-3">
                <CountBox
                  count={stats.competition.live || 0}
                  text="Sedang Berlangsung"
                  link="/super/competition/live"
                />
              </div>

              {/* published competition */}
              <div style={{ marginBottom: 20 }} className="col-md-3">
                <CountBox
                  count={stats.competition.posted || 0}
                  text="Terpublikasi"
                  link="/super/competition/posted"
                />
              </div>

              {/* rejected competition */}
              <div style={{ marginBottom: 20 }} className="col-md-3">
                <CountBox
                  count={stats.competition.rejected || 0}
                  text="Kompetisi di Tolak"
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
            <HeaderDashboard
              title="Berita"
              text="Seluruh data berita di Kompetisi Id"
            />
          </div>
          {!stats.is_loading && stats.status == 200 ? (
            <React.Fragment>
              {/* draft count */}
              <div style={{ marginBottom: 20 }} className="col-md-3">
                <CountBox
                  count={stats.news.draft || 0}
                  text="Berita Draft"
                  link="/super/news"
                />
              </div>

              {/* posted competition */}
              <div style={{ marginBottom: 20 }} className="col-md-3">
                <CountBox
                  count={stats.news.posted || 0}
                  text="Berita Terpublikasi"
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
              title="Member"
              text="Seluruh data member di Kompetisi Id"
            />
          </div>
          {!stats.is_loading && stats.status == 200 ? (
            <React.Fragment>
              {/* draft count */}
              <div style={{ marginBottom: 20 }} className="col-md-3">
                <CountBox
                  count={stats.members.banned || 0}
                  text="Member Dicekal"
                  link="/super/members/banned"
                />
              </div>

              {/* posted competition */}
              <div style={{ marginBottom: 20 }} className="col-md-3">
                <CountBox
                  count={stats.members.active || 0}
                  text="Member Aktif"
                  link="/super/members/active"
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

export default connect(mapStateToProps)(SuperContainer)
