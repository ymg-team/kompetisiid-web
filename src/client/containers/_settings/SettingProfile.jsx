import React from "react"
import Helmet from "../../components/Helmet"

import { connect } from "react-redux"

class SettingProfile extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Pengaturan Profil" />
        <p>this is setting page</p>
      </div>
    )
  }
}

export default connect()(SettingProfile)
