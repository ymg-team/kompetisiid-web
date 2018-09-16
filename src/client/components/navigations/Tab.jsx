import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

export default props => (
  <div className="container-competition-tab" style={{ margin: "20px 0 20px" }}>
    <ul className="horizontal-menu">
      {props.tabs.map((n, key) => {
        return (
          <li key={key} className={n.is_active ? "active" : ""}>
            <Link to={n.target}>
              {n.text}{" "}
              {n.count ? (
                <span className="label label-gray">{n.count}</span>
              ) : null}
            </Link>
          </li>
        )
      })}
    </ul>
  </div>
)
