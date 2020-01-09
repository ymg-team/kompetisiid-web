import React from "react"
import { Link } from "react-router-dom"

const CompetitionTags = props => {
  return (
    <span>
      {props.tags ? (
        props.tags.map((n, key) => {
          return (
            <Link className="btn btn-white" to={`/browse/tag/${n}`} key={key}>
              {n}
            </Link>
          )
        })
      ) : (
        <small className="text-muted">tidak ada tags tersedia</small>
      )}
    </span>
  )
}

export default CompetitionTags
