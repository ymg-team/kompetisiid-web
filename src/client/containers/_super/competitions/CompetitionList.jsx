import React, { Component } from "react"
import HeaderDashboard from "../../../components/cards/HeaderDashboard"
import Tab from "../../../components/navigations/Tab"
import CompetitionCard from "../../../components/cards/dashboard/CompetitionListCard"
import Loader from "../../../components/preloaders/GlobalLoader"
import Helmet from "../../../components/Helmet"

import { fetchJelajah, fetchJelajahMore } from "../../competition/actions"
import { connect } from "react-redux"

let Filter, Params
let Limit = 20

class MyCompetition extends Component {
  static defaultProps = {
    data: {}
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    Filter = generateFilter(this.props)
    Params = generateParams(this.props)
    this.props.dispatch(fetchJelajah(Params, Filter))
  }

  fetchMoreData() {
    const competition = this.props.data[Filter]
    Params.lastid = competition.data[competition.data.length - 1].id
    this.props.dispatch(fetchJelajahMore(Params, Filter))
  }

  UNSAFE_componentWillReceiveProps(np) {
    const NextFilter = generateFilter(np)
    if (Filter != NextFilter) {
      Filter = NextFilter
      Params = generateParams(np)
      this.props.dispatch(fetchJelajah(Params, Filter))
    }
  }

  render() {
    const { tab_active } = this.props.route
    const competitions = this.props.data[Filter] || {}
    const tabcontent = [
      {
        text: "berlangsung",
        is_active: tab_active == 1,
        count: 7,
        target: "/super/competition/live"
      },
      {
        text: "semua kompetisi",
        is_active: tab_active == 2,
        count: 12,
        target: "/super/competition/all"
      }
    ]

    return (
      <div>
        <Helmet title={`kompetisi ${tabcontent[tab_active - 1].text}`} />
        <HeaderDashboard
          title="Kompetisi Terpasang"
          text="Berikut adalah kompetisi yang telah anda pasang di Kompetisi ID."
        />
        {/* tab navigations */}
        <Tab tabs={tabcontent} />

        {/* preloader */}
        {competitions && competitions.is_loading ? (
          <div className="row">
            <Loader />
          </div>
        ) : null}

        {/* generate contents */}
        {competitions && competitions.status ? (
          <div className="p-b-50">
            {competitions.status == 200 ? (
              <p>
                Menampilkan <strong>{competitions.data.length}</strong> dari{" "}
                <strong>{competitions.count}</strong> kompetisi 
              </p>
            ) : null}
            {competitions.data
              ? competitions.data.map((n, key) => {
                  return <CompetitionCard key={key} n={n} />
                })
              : null}
            {competitions.status != 200 ? (
              <p className="text-muted align-center">{competitions.message}</p>
            ) : null}

            {/* load more competitions */}
            {competitions.status == 200 && !competitions.is_loading ? (
              <div className="align-center">
                <a
                  onClick={() => this.fetchMoreData()}
                  className="btn btn-white"
                >
                  Tampilan Kompetisi Berikutnya
                </a>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    )
  }
}

function generateFilter(props) {
  const { tab_active } = props.route
  return `${props.session.username}_${tab_active}_${Limit}`
}

function generateParams(props) {
  const { tab_active } = props.route
  let Params = {
    limit: Limit,
    username: props.session.username,
    // available status : active || all || waiting || reject || accept
    status: props.route.status || "all"
  }

  return Params
}

function mapStateToProps(state) {
  const { Kompetisi, User } = state
  return {
    data: Kompetisi.data,
    session: User.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyCompetition)
