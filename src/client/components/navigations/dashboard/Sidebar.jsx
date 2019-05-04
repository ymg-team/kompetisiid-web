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

        {/* compotition */}
        <hr />
        <li>
          {" "}
          <strong>Kompetisi</strong>
        </li>
        <li>
          <Link to="/dashboard/competition/create">
            <i className="fas fa-plus" /> Kirim Kompetisi
          </Link>
        </li>
        <li>
          <Link to="/dashboard/competition/waiting">
            Kompetisi Menunggu <span className="label label-blue">2</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/competition/posted">
            Kompetisi Berlangsung <span className="label label-blue">2</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/competition/ended">
            Kompetisi Berakhir <span className="label label-blue">2</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/competition/rejected">
            Kompetisi Ditolak <span className="label label-blue">2</span>
          </Link>
        </li>
        {/* end of competition */}

        {/* logout from dashboard */}
        <hr />
        <li>
          <a onClick={() => props.handleLogout()} href="javascript:;">
            Logout
          </a>
        </li>
        {/* end of logout from dashboard */}
      </ul>
    </div>
  )
}
