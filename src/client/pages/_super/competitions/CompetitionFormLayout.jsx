import React from "react"
import { connect } from "react-redux"
import { getDetail } from "../../competition/actions"
import { renderRoutes } from "react-router-config"

// components
import Helmet from "../../../components/Helmet"
import FullPageLoader from "../../../components/preloaders/FullContentLoader"
import FullPageError from "../../../components/boxs/FullPageError"

class CompetitionFormContainer extends React.Component {
  componentDidMount = () => {
    // request competition detail by kompetisi
    if (this.props.match.params.id) {
      this.props.dispatch(getDetail(this.props.match.params.id))
    }
  }

  render = () => {
    const { id } = this.props.match.params
    const competitionData = this.props.competition[id] || {}

    return (
      <React.Fragment>
        {(id && competitionData.is_loading) ||
        (id && !competitionData.status) ? (
          <FullPageLoader />
        ) : id && competitionData.status != 200 ? (
          <FullPageError
            code={competitionData.status}
            message={competitionData.message}
          />
        ) : (
          renderRoutes(this.props.route.routes)
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.Kompetisi.categories,
    competition: state.Kompetisi.detail,
    others: state.Others,
    session: state.User.session
  }
}

export default connect(mapStateToProps)(CompetitionFormContainer)
