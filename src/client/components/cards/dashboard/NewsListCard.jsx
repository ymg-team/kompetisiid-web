import React from "react"
import { Link } from "react-router-dom"
import { epochToRelativeTime } from "../../../helpers/DateTime"

const NewsListCard = props => {
  const { data } = props
  return (
    <div className="competition-items">
      <div className="item">
        <div className="item__left">
          <h4>
            <Link to={`/super/news/${data.id}`}>{data.title}</Link>
          </h4>
          <p className="text-muted" style={{ margin: 0 }}>
            <span>Dipost {epochToRelativeTime(data.created_at)} hari lalu</span>{" "}
            oleh {data.author.username}
          </p>
        </div>
      </div>
    </div>
  )
}

export default NewsListCard
