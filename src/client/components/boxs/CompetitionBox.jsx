import React from "react"

// components
import GAds from "../cards/GoogleAds"
import Card from "../cards/CompetitionListCard"
import Loader from "../preloaders/CompetitionCardLoader"

function generateList(size, n) {
  return n.map((n, key) => {
    if (key % 15 === 0 && key !== 0) {
      return [
        <div
          key={`ads_${key}`}
          className="col-md-12 align-center"
          style={{ margin: "0 0 40px", textAlign: "center" }}
        >
          <GAds
            key={`ads_${key}`}
            adClient="ca-pub-4468477322781117"
            adSlot={2722581701}
            timeout={1000}
            // adTest={true}
          />
        </div>,
        <Card size={size} key={key} n={n} />
      ]
    } else {
      return <Card size={size} key={key} n={n} />
    }
  })
}

const CompetitionBox = props => {
  let {
    data,
    status,
    message,
    is_loading,
    subtitle,
    size,
    count,
    meta,
    style
  } = props
  if (typeof subtitle == "undefined") subtitle = true
  if (typeof size == "undefined") size = "large"

  return (
    <div id="competition-container">
      <div className="container">
        <div className="no-margin">
          {/* header total show competition */}
          {data && status && subtitle ? (
            <div className="col-md-12">
              <br />
              menampilkan <strong> {data.length || 0}</strong> dari{" "}
              <strong>{count > 5000 ? "banyak" : count}</strong> kompetisi
              <br />
            </div>
          ) : null}
          {subtitle ? <div className="row m-10" /> : null}
          {/* end of header total show competition */}

          {/* competition literation */}
          {status ? (
            !data ? (
              <p className="text-muted align-center">{message}</p>
            ) : (
              generateList(size, data)
            )
          ) : null}
          {/* end of competition literation */}

          {is_loading || !status ? (
            <Loader size={props.size} total={props.total} />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default CompetitionBox
