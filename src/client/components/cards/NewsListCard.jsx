import React from "react"
import { Link } from "react-router-dom"
import { CardCompetitionStyled } from "./CompetitionListCard"
import { epochToRelativeTime } from "../../helpers/dateTime"

const LabelDraft = () => (
  <div
    style={{
      position: "absolute",
      background: "#f4f4f4",
      top: "85px",
      margin: "0 auto",
      padding: "10px",
      color: "grey",
      opacity: "1",
      width: "25%",
      textAlign: "center",
      left: "25%",
      marginLeft: "14%",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "1.1px",
      zIndex: 1
    }}
  >
    draft
  </div>
)

export default props => {
  const { n, size } = props
  const target = `/news/${n.id}/${n.nospace_title}`
  return (
    <CardCompetitionStyled
      className={
        props.size == "small" ? "col-md-3 col-sm-6" : "col-md-4 col-sm-6"
      }
    >
      <div
        className="card-competition"
        style={{ opacity: n.is_draft ? 0.5 : 1 }}
      >
        {n.is_draft ? <LabelDraft /> : null}
        <Link to={target}>
          <div className="card-competition--poster">
            <img
              src={
                n.image ? n.image.small : `/assets/4.2/img/slider/slider-2.png`
              }
              alt={n.title}
            />
          </div>
        </Link>
        <div className="card-competition--inside">
          <Link to={target}>
            <h3>{n.title}</h3>
            <small className="text-muted">
              {epochToRelativeTime(n.created_at)}
            </small>
          </Link>
          <br />
          <small>
            diposting oleh{" "}
            <Link to={`/user/${n.author.username}`}>{n.author.username}</Link>
          </small>
          <br />
          <a className="muted" href="#">
            <img
              className="avatar"
              src={
                n.author.avatar.small || `/assets/4.2/img/avatar-default.jpg`
              }
            />
          </a>
        </div>
      </div>
    </CardCompetitionStyled>
  )
}
