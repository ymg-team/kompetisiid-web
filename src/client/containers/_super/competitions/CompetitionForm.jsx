import React from "react"
import { connect } from "react-redux"
import { Prompt } from "react-router"
import { alert } from "../../../components/Alert"

// components
import Helmet from "../../../components/Helmet"
import Form from "../../../components/competition/super/CompetitionForm"

class CompetitionFormContainer extends React.Component {
  notSubmited = true

  UNSAFE_componentWillReceiveProps = np => {
    if (np.others.competition_form && np.others.competition_form.message) {
      const { message, status } = np.others.competition_form
      alert(
        true,
        message,
        status === 201 || status === 200 ? "success" : "error"
      )
      if (status === 201 || status === 200) {
        this.notSubmited = false
        if (
          this.props.session &&
          ["admin", "moderator"].includes(this.props.session.level)
        ) {
          location.href = "/super/competition"
        } else {
          location.href = "/dashboard/competition/waiting"
        }
      }
    }
  }

  render = () => {
    const { id } = this.props.match.params
    const competitionData = this.props.competition[id] || {}

    return (
      <React.Fragment>
        <Helmet
          title="Update Data Kompetisi"
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
        <Prompt
          when={this.notSubmited}
          message={
            "Data kompetisi yang kamu ketikan akan hilang, apakah yakin?"
          }
        />
        <Form
          session={this.props.session || {}}
          response={this.props.others.competition_form || {}}
          dispatch={this.props.dispatch}
          categories={this.props.categories}
          competitionId={this.props.match.params.id}
          competitionData={competitionData.data || {}}
        />
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
