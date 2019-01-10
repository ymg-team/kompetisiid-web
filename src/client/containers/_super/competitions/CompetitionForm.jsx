import React from "react"
import { connect } from "react-redux"
import { getCategories } from "../../competition/actions"

// components
import Helmet from "../../../components/Helmet"
import Form from "../../../components/competition/super/CompetitionForm"

class CompetitionFormContainer extends React.Component {
  render = () => {
    return (
      <React.Fragment>
        <Helmet
          link={[
            {
              href: "https://cdn.jsdelivr.net/npm/pikaday/css/pikaday.css",
              rel: "stylesheet",
              type: "text/css"
            }
          ]}
          script={[
            {
              src: "https://cdn.jsdelivr.net/npm/pikaday/pikaday.js"
            }
          ]}
        />
        <Form
          dispatch={this.props.dispatch}
          categories={this.props.categories}
          id={this.props.match.params.id}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.Kompetisi.categories
  }
}

export default connect(mapStateToProps)(CompetitionFormContainer)
