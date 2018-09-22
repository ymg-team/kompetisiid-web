import React, { Component } from "react"
import HeaderDashboard from "../../../components/cards/HeaderDashboard"
import Tab from "../../../components/navigations/Tab"
import CompetitionCard from "../../../components/cards/dashboard/CompetitionListCard"
import Loader from "../../../components/loaders/DefaultLoader"
import Helmet from "../../../components/Helmet"

import { fetchJelajah } from "../../competition/actions"
import { connect } from "react-redux"

let Filter, Params
let Limit = 20

class MyCompetition extends Component {
  static defaultProps = {
    data: {}
  }

  static fetchData({ store, params, query }) {
    return new Promise(resolve => {
      return resolve()
    })
  }

  componentDidMount() {
    Filter = generateFilter(this.props)
    Params = generateParams(this.props)
    this.props.dispatch(fetchJelajah(Params, Filter))
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
        target: "/super/competition/end"
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
            {competitions.status == 200 ? (
              competitions.data.map((n, key) => {
                return <CompetitionCard key={key} n={n} />
              })
            ) : (
              <p className="text-muted">{competitions.message}</p>
            )}
            {competitions.status == 200 ? (
              <span>
                <a className="btn btn-white">
                  <i className="fa fa-angle-left">&nbsp;</i>
                  sebelumnya{" "}
                </a>
                {competitions.data.length >= Limit ? (
                  <a className="btn btn-white">
                    berikutnya <i className="fa fa-angle-right" />
                  </a>
                ) : null}
              </span>
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
    username: props.session.username
  }
  if (tab_active == 1) Params.live = 1
  if (tab_active == 2) Params.berakhir = 1
  // if (tab_active == 3) Params.waiting = 1
  // if (tab_active == 4) Params.reject = 1

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
