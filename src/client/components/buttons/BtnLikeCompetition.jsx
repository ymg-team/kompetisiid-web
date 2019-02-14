import React from "react"
import {connect} from "react-redux"
import {alert} from "../Alert"

class BtnLikeCompetition extends React.Component {

  clickHandler = () => {
    if(this.props.auth && this.props.auth.id) {
      window.redirectTo("/login")
    } else {
      alert(true, "Maaf sistem belum tersedia", "warning")
    }
  }

  render = () => {
    return (
      <a
        className="btn"
        href="javascript:;"
        title={`Klik untuk ${
          this.props.isLike ? "batal menyukai" : "menyukai"
        } kompetisi ini`}
        style={{ fontSize: 25, padding: "5px 10px" }}
        onClick={() => this.clickHandler()}
      >
        <span
          className={`fa  ${
            this.props.isLike ? "fa-thumbs-up" : "fa-thumbs-up"
          }`}
        />
        <span
          style={{
            fontWeight: 100,
            marginLeft: 5,
            fontSize: 20
          }}
        >
          0
        </span>
      </a>
    )
  }
}

const mapStateToProps = State => {
  return {
    auth: State.auth
  }
}

export default connect(mapStateToProps)(BtnLikeCompetition)
