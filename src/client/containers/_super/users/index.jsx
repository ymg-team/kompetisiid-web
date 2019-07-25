import React from "react"

// components
import HeaderDashboard from "../../../components/cards/HeaderDashboard"
import Helmet from "../../../components/Helmet"
import Tab from "../../../components/navigations/Tab"
import Loading from "../../../components/preloaders/GlobalLoader"

class SuperUserList extends React.Component {
  render() {
    const title = "Manajemen User"
    const { type } = this.props.match.params
    const TabContents = [
      {
        text: "Telah Konfirmasi",
        is_active: type === "confirmed",
        target: "/_super/users/confirmed"
      },
      {
        text: "Belum Konfirmasi",
        is_active: type === "unconfirmed",
        target: "/_super/users/unconfirmed"
      },
      {
        text: "banned",
        is_active: type === "banned",
        target: "/_super/users/banned"
      }
    ]

    return (
      <React.Fragment>
        <Helmet title={title} />

        <HeaderDashboard title={title} noBorder />

        <Tab tabs={TabContents} />
      </React.Fragment>
    )
  }
}

export default SuperUserList
