import React from "react"
import HeaderDashboard from "../../../components/cards/HeaderDashboard"
import Tab from "../../../components/navigations/Tab"
import CompetitionCard from "../../../components/cards/dashboard/CompetitionListCard"
import Loader from "../../../components/preloaders/GlobalLoader"
import Helmet from "../../../components/Helmet"
import Button from "../../../components/buttons/index"

import { fetchJelajah, fetchJelajahMore } from "../../competition/actions"
import { connect } from "react-redux"

let Filter, Params
let Limit = 20

class MyCompetition extends React.Component {
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
    const { stats } = this.props
    const competitions = this.props.data[Filter] || {}
    let tabcontent = []

    // generate tab content
    if(this.props.session && ["admin", "moderator"].includes(this.props.session.level)) {
      // if logged in user is admin or moderator
      tabcontent = [
        {
          text: "menunggu",
          is_active: tab_active == 3,
          count: stats.competition ? stats.competition.waiting : 0,
          target: "/super/competition/waiting"
        },
        {
          text: "berlangsung",
          is_active: tab_active == 1,
          count: stats.competition ? stats.competition.live : 0,
          target: "/super/competition/live"
        },
        {
          text: "dipublikasi",
          is_active: tab_active == 2,
          count: stats.competition ? stats.competition.posted : 0,
          target: "/super/competition/posted"
        }
      ]
    } else {
      // if logged in user is just member
      tabcontent = [
        {
          text: "menunggu",
          is_active: tab_active == 1,
          count: stats.competition ? stats.competition.waiting : 0,
          target: "/dashboard/competition/waiting"
        },
        {
          text: "berlangsung",
          is_active: tab_active == 2,
          count: stats.competition ? stats.competition.live : 0,
          target: "/dashboard/competition/live"
        },
        {
          text: "dipublikasi",
          is_active: tab_active == 3,
          count: stats.competition ? stats.competition.posted : 0,
          target: "/dashboard/competition/posted"
        },
        {
          text: "ditolak",
          is_active: tab_active == 4,
          count: stats.competition ? stats.competition.rejected : 0,
          target: "/dashboard/competition/rejected"
        }
      ]
    }

    const title = `kompetisi ${tabcontent[tab_active - 1].text}`

    return (
      <React.Fragment>
        <Helmet title={title} />
        <HeaderDashboard
          title={title}
          text="Berikut adalah kompetisi yang telah anda pasang di Kompetisi ID."
        />
        {/* tab navigations */}
        <Tab tabs={tabcontent} />

        {/* preloader */}
        {competitions && competitions.is_loading && !competitions.status ? (
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
            {competitions.status == 200 ? (
              <div className="align-center">
                <Button
                  onClick={() => this.fetchMoreData()}
                  size="large"
                  color="white"
                  loading={competitions.is_loading}
                  text="Kompetisi Berikutnya"
                />
              </div>
            ) : null}
            {/* end of load more competitions */}
          </div>
        ) : null}
      </React.Fragment>
    )
  }
}

function generateFilter(props) {
  const { tab_active } = props.route
  return `${props.session.username}_${tab_active}_${Limit}`
}

function generateParams(props) {
  let Params = {
    limit: Limit,
    // username: props.session.username,
    // available status : active || all || waiting || reject || accept
    status: props.route.status || "all"
  }

  if(!["admin","moderator"].includes(props.session.level)) {
    Params.by_me = true
  }

  return Params
}

function mapStateToProps(state) {
  const { Kompetisi, User } = state
  return {
    data: Kompetisi.data,
    session: User.session,
    stats: state.Others.count_super_sidebar || {}
  }
}

module.exports = connect(mapStateToProps)(MyCompetition)
