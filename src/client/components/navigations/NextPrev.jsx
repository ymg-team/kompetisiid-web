import React from "react"
import { Link } from "react-router-dom"

export default props => {
  const { next, prev } = props
  return (
    <div className="container">
      <div className="row" style={{ margin: "0 -25px" }}>
        <div className="col-md-10 col-md-push-1 m-t-b-20">
          <div className="competition-nextprev">
            <div
              className={`col-md-4 align-right ${prev ? "btn-nextprev" : ""}`}
            >
              {prev ? (
                <Link to={prev.link}>
                  <h4>sebelumnya</h4>
                  {prev.title}
                </Link>
              ) : (
                <p />
              )}
            </div>
            <div className="col-md-4">
              <p />
            </div>
            <div
              className={`col-md-4 align-left ${next ? "btn-nextprev" : ""}`}
            >
              {next ? (
                <Link to={next.link}>
                  <h4>berikutnya</h4>
                  {next.title}
                </Link>
              ) : (
                <p />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
