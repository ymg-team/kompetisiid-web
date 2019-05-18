import React from "react"
import Helmet from "../../components/Helmet"
import HeaderDashboard from "../../components/cards/HeaderDashboard"

import { connect } from "react-redux"

class SettingAccount extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Pengaturan Akun" />
        <HeaderDashboard title="Seting Akun" text="This is setting page" />
      </div>
    )
  }
}

export default connect()(SettingAccount)
