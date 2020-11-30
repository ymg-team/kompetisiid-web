import React from "react"
import { Link } from "react-router-dom"

// components
import Loader from "../preloaders/GlobalLoader"
import MediaPartnerCard from "../cards/MediaPartner/index"

const MediaPartnerBox = props => {
  const { status, message, data } = props
  return (
    <React.Fragment>
      <div className="col-md-8 col-md-push-2 col-lg-6 col-lg-push-3 no-padding">
        <div className="row">
          <div className="media-partner align-center">
            <h2 className="big-text">Media Partner KI</h2>
            <div style={{ paddingBottom: 20 }}>
              KI juga ikut berperan sebagai media partner berbagai kompetisi di
              Indonesia.{" "}
            </div>
          </div>
        </div>
        {status ? (
          status === 200 ? (
            <div className="row">
              {data.map(n => {
                return <MediaPartnerCard key={n.id} data={n} />
              })}
            </div>
          ) : (
            <p className="text-muted">{message}</p>
          )
        ) : (
          <Loader />
        )}
      </div>
      <div className="col-md-12">
        <div className="col-md-8 col-md-push-2 col-lg-6 col-lg-push-3">
          <Link
            className="btn btn-black btn-fullwidth"
            style={{ marginBottom: 40 }}
            to={`/browse?mediapartner=1`}
          >
            <strong>Selengkapnya</strong>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MediaPartnerBox
