import React from "react"
import Loadable from "react-loadable"
import { fetchRequest, fetchMoreRequest } from "./actions"
import { connect } from "react-redux"

import HeaderDashboard from "../../../components/cards/HeaderDashboard"
import Tab from "../../../components/navigations/Tab"
import Loading from "../../../components/preloaders/GlobalLoader"
import Helmet from "../../../components/Helmet"

const RequestBox = Loadable({
  loader: () => import("../../../components/boxs/_super/RequestBox"),
  loading: Loading
})

let Filter = "", Payload = {}

class RequestCompetition extends React.Component {
  componentDidMount() {
    this.fetchData()
  }

  generateFilter(props = this.props) {
    Filter = `request_${props.route.status}`
    return Filter
  }

  generatePayload(props = this.props) {
    Payload = {
      status: props.route.status
    }

    return Payload
  }

  fetchData(params = {}) {
    Filter = this.generateFilter(this.props)
    Payload = this.generatePayload(this.props)
    if (params.lastid) Payload.lastid = params.lastid
    this.props.dispatch(fetchRequest(Payload, Filter))
  }

  render() {
    const { status } = this.props.route
    const { data, stats } = this.props

    const tabcontent = [
      {
        text: "menunggu",
        is_active: status === "waiting",
        count: stats.request ? stats.request.waiting : 0,
        target: "/super/requests/waiting"
      },
      {
        text: "diterima",
        is_active: status == "posted",
        count: stats.request ? stats.request.accept : 0,
        target: "/super/requests/posted"
      },
      {
        text: "ditolak",
        is_active: status === "reject",
        count: stats.request ? stats.request.reject : 0,
        target: "/super/requests/reject"
      }
    ]

    const title = "Request Kompetisi dari Publik"
    const description =
      "Halaman ini digunakan untuk validasi request beberapa kompetisi yang telah dipasang publik melalui alamat https://kompetisi.id/add/send"

    return (
      <React.Fragment>
        <Helmet title={title} description={description} />

        <HeaderDashboard title={title} text={description} noBorder />

        <Tab tabs={tabcontent} />

        <RequestBox
          handleLoadMore={lastid => this.fetchData({ lastid })}
          data={data[Filter] || {}}
        />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    session: state.User.session.data,
    data: state.Request.list,
    stats: state.Others.count_super_sidebar || {}
  }
}

export default connect(mapStateToProps)(RequestCompetition)
