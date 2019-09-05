import React from "react"
import HeaderDashboard from "../../../components/cards/HeaderDashboard"
import CompetitionCard from "../../../components/cards/_dashboard/CompetitionListCardSimple"
import Loader from "../../../components/preloaders/GlobalLoader"
import Helmet from "../../../components/Helmet"
import Button from "../../../components/buttons/index"

import { fetchLikedCompetition } from "../../competition/actions"
import { connect } from "react-redux"
import { toCamelCase } from "string-manager"

let Filter, Params
let Limit = 20

const Meta = {
  liked: {
    title: "Kompetisi Disukai",
    desc: "Berikut adalah daftar kompetisi yang kamu sukai"
  },
  joined: {
    title: "Kompetisi Diikuti",
    desc: "Berikut adalah daftar kompetisi yang kamu ikuti (semoga menang ya!)"
  },
  subscribed: {
    title: "Kompetisi Berlangganan",
    desc: "Berikut adalah daftar kompetisi langgananmu"
  }
}

class MyCompetition extends React.Component {
  static defaultProps = {
    data: {}
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData(props = this.props) {
    Filter = generateFilter(props)
    Params = generateParams(props)
    this.props.dispatch(fetchLikedCompetition(Params, Filter))
  }

  fetchMoreData() {
    const competition = this.props.data[Filter]
    Params.lastid = competition.data[competition.data.length - 1].id
    this.props.dispatch(fetchLikedCompetition(Params, Filter))
  }

  UNSAFE_componentWillReceiveProps(np) {
    const NextFilter = generateFilter(np)
    if (Filter != NextFilter) {
      return this.fetchData(np)
    }
  }

  render() {
    const { type } = this.props.route
    const competitions = this.props.data[Filter] || {}
    const { title, desc } = Meta[type]

    return (
      <React.Fragment>
        <Helmet title={title} />
        <HeaderDashboard title={title} text={desc} noBorder />

        {/* preloader */}
        {competitions && competitions.is_loading && !competitions.status ? (
          <div className="row">
            <Loader />
          </div>
        ) : null}

        {/* generate contents */}
        {competitions && competitions.status ? (
          <div className="p-b-50">
            {competitions.data && competitions.count ? (
              <p>
                Menampilkan <strong>{competitions.data.length}</strong> dari{" "}
                <strong>{competitions.count}</strong> kompetisi
              </p>
            ) : null}
            {competitions.data
              ? competitions.data.map((n, key) => {
                  return (
                    <CompetitionCard
                      session={this.props.session}
                      key={key}
                      n={n}
                    />
                  )
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
  const { type } = props.route
  return `${props.session.username}_${type}`
}

function generateParams(props) {
  let Params = {
    limit: Limit,
    type: props.route.type,
    user_id: props.session.id
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

export default connect(mapStateToProps)(MyCompetition)
