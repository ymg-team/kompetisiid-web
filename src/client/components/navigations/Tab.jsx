import React from "react"
import { Link } from "react-router-dom"

export default props => (
  <div className="container-competition-tab" style={{ margin: "20px 0 20px" }}>
    <ul className="horizontal-menu">
      {props.tabs.map((n, key) => {
        if (
          (typeof n.count != "undefined" && n.count > 0) ||
          typeof n.count == "undefined"
        ) {
          return (
            <li key={key} className={n.is_active ? "active" : ""}>
              <Link to={n.target}>
                {n.text}{" "}
                <span className="label label-gray">{n.count}</span>
              </Link>
            </li>
          )
        } else {
          return null
        }
      })}
    </ul>
  </div>
)
