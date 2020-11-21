import React from "react"

const Loader = props => {
  let childs = []
  for (let n = 0; n < props.total; n++) {
    childs.push(
      <div
        key={n}
        className={`${
          props.size == "large" ? "col-md-4 col-xs-6" : "col-md-3"
        } ${n > 0 ? "hide-mobile" : ""}`}
      >
        <div className="competition-loader">
          <div className="animated-background">
            <div className="background-masker background-masker-1" />
            <div className="background-masker background-masker-1-1" />
            <div className="background-masker background-masker-1-2" />
            <div className="background-masker background-masker-2" />
            <div className="background-masker background-masker-2-1" />
            <div className="background-masker background-masker-2-2" />
            <div className="background-masker background-masker-5" />
            <div className="background-masker background-masker-5-1" />
            <div className="background-masker background-masker-5-2" />
            <div className="background-masker background-masker-6" />
            <div className="background-masker background-masker-6-1" />
            <div className="background-masker background-masker-6-2" />
            <div className="background-masker background-masker-6-3" />
            <div className="background-masker background-masker-6-4" />
            <div className="background-masker background-masker-6-5" />
            <div className="background-masker background-masker-7" />
          </div>
        </div>
      </div>
    )
  }
  if (props.withContainer) {
    return (
      <div className="container">
        <div className="row">{childs}</div>
      </div>
    )
  } else {
    return <div className="row">{childs}</div>
  }
}

Loader.defaultProps = {
  total: 3,
  size: "large"
}

export default Loader
