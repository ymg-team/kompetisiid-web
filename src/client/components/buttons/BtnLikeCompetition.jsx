import React from "react"
import { connect } from "react-redux"
import { alert } from "../Alert"
import { likeActionCompetition } from "../../pages/competition/actions"

class BtnLikeCompetition extends React.Component {
  clickHandler = () => {
    if (this.props.session && this.props.session.id) {
      return this.props.dispatch(
        likeActionCompetition(this.props.competition_id)
      )
    } else {
      return window.transitionTo("/login")
    }
  }

  render = () => {
    return (
      <a
        className="btn"
        href="#"
        title={`Klik untuk ${
          this.props.isLike ? "batal menyukai" : "menyukai"
        } kompetisi ini`}
        style={{ fontSize: 25, padding: "5px 10px" }}
        onClick={(e) => {
          e.preventDefault()
          this.clickHandler()
        }}
      >
        <span
          className={`${
            this.props.isLike ? "fa fa-thumbs-up" : "far fa-thumbs-up"
          }`}
        />
        <span
          style={{
            fontWeight: 100,
            marginLeft: 5,
            fontSize: 20
          }}
        >
          {this.props.total}
        </span>
      </a>
    )
  }
}

const mapStateToProps = State => {
  return {
    session: State.User.session,
    competition: State.competition
  }
}

export default connect(mapStateToProps)(BtnLikeCompetition)
