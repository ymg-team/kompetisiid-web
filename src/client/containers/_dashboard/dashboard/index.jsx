import React from "react"
import { connect } from "react-redux"

// components
import Helmet from "react-helmet"

class Dashboard extends React.Component {
  render = () => {
    return (
      <React.Fragment>
        <Helmet title="Dashboard - Kompetisi Id" />
        <h1>Dashboard Kompetisi.id akan segera hadir</h1>
        <p>Tunggu saja ya.</p>
      </React.Fragment>
    )
  }
}

export default connect()(Dashboard)
