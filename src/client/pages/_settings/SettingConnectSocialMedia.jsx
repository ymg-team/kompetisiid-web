import React from "react"
import Helmet from "../../components/Helmet"
import HeaderDashboard from "../../components/cards/HeaderDashboard"

import { connect } from "react-redux"

class SettingProfile extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet title="Pengaturan Koneksi Sosial Media" />
        <HeaderDashboard
          title="Seting Sosial Media"
          text="Hubungkan akun Kompetisi Id dengan Sosial Media"
        />
        <p className="text-soft">Fitur ini sedang dalam tahap pengembangan</p>
      </React.Fragment>
    )
  }
}

export default connect()(SettingProfile)
