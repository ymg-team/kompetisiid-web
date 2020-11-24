import React from "react"
import { Link } from "react-router-dom"
import Label from "../Label"

export default props => (
  <div className="container-competition-tab" style={{ margin: "20px 0 20px" }}>
    <ul className="horizontal-menu">
      {props.tabs.map((n, key) => {
        return (
          <li key={key} className={n.is_active ? "active" : ""}>
            <Link to={n.target}>
              {n.text} {n.count ? <Label type="gray" text={n.count} /> : null}
            </Link>
          </li>
        )
      })}
    </ul>
  </div>
)
