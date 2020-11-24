import React from "react"
import { truncate } from "string-manager"

// components
import MediaPartnerCardStyled from "./index.styled"
import { Link } from "react-router-dom"

const MediaParnerCard = ({ data }) => {
  return (
    <MediaPartnerCardStyled
      key={data.id}
      className="card-mediapartner col-lg-12 col-xs-6"
    >
      <div
        className="thumbnails"
        style={{ backgroundImage: `url(${data.poster.small})` }}
      />
      <div className="details">
        <span className="categories">
          <Link className="muted" to={`/browse/${data.main_category.name}`}>
            {data.main_category.name}
          </Link>
          ,&nbsp;
          <Link
            className="muted"
            to={`/browse/${data.main_category.name}/${data.sub_category.name}`}
          >
            {data.sub_category.name}
          </Link>
        </span>
        <Link to={`/competition/${data.id}/regulations/${data.nospace_title}`}>
          <h3>{data.title}</h3>
        </Link>
        <small>
          Dipasang{" "}
          <Link to={`/user/${data.author.username}`}>
            {data.author.username}
          </Link>
        </small>
        <span className="hide-mobile">
          <br />
          <span>{truncate(data.sort, 300, "...")}</span>
        </span>
      </div>
    </MediaPartnerCardStyled>
  )
}

export default MediaParnerCard
