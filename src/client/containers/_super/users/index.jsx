import React from "react"
import { connect } from "react-redux"
import { fetchUsers } from "../../../../store/user/actions"
import Loadable from "react-loadable"

// components
import HeaderDashboard from "../../../components/cards/HeaderDashboard"
import Helmet from "../../../components/Helmet"
import Tab from "../../../components/navigations/Tab"
import Loading from "../../../components/preloaders/GlobalLoader"

const UserBox = Loadable({
  loader: () => import("../../../components/boxs/_super/UserBox"),
  loading: Loading
})

let Filter = "",
  Payload = {}

class SuperUserList extends React.Component {
  componentDidMount() {
    this.fetchData()
  }

  componentWillReceiveProps(np) {
    this.fetchData(np)
  }

  fetchData(props = this.props, params = {}) {
    Filter = this.generateFilter(props)
    Payload = this.generatePayload(props)
    if (params.lastid) Payload.lastid = params.lastid

    // only request if data not available
    const data = props.users[Filter] || {}
    if ((!data.status && !data.is_loading) || params.force)
      this.props.dispatch(fetchUsers({ query: Payload, filter: Filter }))
  }

  generatePayload(props = this.props) {
    const { type } = props.match.params

    Payload = {
      banned: type == "banned",
      verified: type == "confirmed",
      unverified: type == "unconfirmed"
    }

    return Payload
  }

  generateFilter(props = this.props) {
    const { type } = props.match.params
    return `super_${type}`
  }

  render() {
    Filter = this.generateFilter()
    const title = "Manajemen User"
    const { type } = this.props.match.params
    const TabContents = [
      {
        text: "Telah Konfirmasi",
        is_active: type === "confirmed",
        target: "/super/users/confirmed"
      },
      {
        text: "Belum Konfirmasi",
        is_active: type === "unconfirmed",
        target: "/super/users/unconfirmed"
      },
      {
        text: "banned",
        is_active: type === "banned",
        target: "/super/users/banned"
      }
    ]

    const data = this.props.users[Filter] || {}

    return (
      <React.Fragment>
        <Helmet title={title} />

        <HeaderDashboard title={title} noBorder />

        <Tab tabs={TabContents} />

        <UserBox
          data={data}
          handleLoadMore={lastid =>
            this.fetchData(this.props, { lastid, force: true })
          }
        />
      </React.Fragment>
    )
  }
}

export default connect(state => {
  return {
    users: state.User.data
  }
})(SuperUserList)
