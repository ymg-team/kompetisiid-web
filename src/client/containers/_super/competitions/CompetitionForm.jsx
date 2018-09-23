import React from "react"

// components
import Form from "../../../components/competition/super/CompetitionForm"

class CompetitionFormContainer extends React.Component {
  render = () => {
    return <Form id={this.props.match.params.id} />
  }
}

export default CompetitionFormContainer
