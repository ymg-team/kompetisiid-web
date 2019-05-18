import React from "react"
import Helmet from "../../components/Helmet"
import HeaderDashboard from "../../components/cards/HeaderDashboard"

import { connect } from "react-redux"

class SettingProfile extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Pengaturan Profil" />
        <HeaderDashboard title="Seting Profil" text="this is setting page" />
      </div>
    )
  }
}

export default connect()(SettingProfile)
