import React from "react"

class BtnLikeCompetition extends React.Component {
  render = () => {
    return (
      <a
        className="btn"
        href="javascript:;"
        title={`Klik untuk ${
          this.props.isLike ? "batal menyukai" : "menyukai"
        } kompetisi ini`}
        style={{ fontSize: 25, padding: "5px 10px" }}
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

export default BtnLikeCompetition
