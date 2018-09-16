import React, { Component } from "react"
import { connect } from "react-redux"

// components
import Helmet from "../../../components/Helmet"
class SuperContainer extends Component {
  render() {
    return <React.Fragment>
      <Helmet 
        title="Dashboard - Kompetisi Id"
      />
      <p>This is container of Super Page</p>
    </React.Fragment>
  }
}

export default connect()(SuperContainer)
