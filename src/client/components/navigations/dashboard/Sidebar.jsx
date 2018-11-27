import React from "react"

// components
import { Link } from "react-router-dom"

export default props => {
  return (
    <div className="dashboard-sidebar">
      <ul>
        <li>
          {" "}
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <a onClick={() => props.handleLogout()} href="javascript:;">
            Logout
          </a>
        </li>
      </ul>
    </div>
  )
}
