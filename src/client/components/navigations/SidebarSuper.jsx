import React from "react"
import { Link } from "react-router-dom"

export default props => (
  <div className="dashboard-sidebar">
    <ul>
      <li>
        {" "}
        <Link to="/super/dashboard">Dashboard</Link>
      </li>
      <hr />
      <li className="active">
        {" "}
        <a href="#">Pasang Kompetisi</a>
      </li>
      <li>
        {" "}
        <a href="#">
          Kompetisi Saya<span className="label label-blue">23</span>
        </a>
      </li>

      {/* competition */}
      <hr />
      <li>
        {" "}
        <strong>Manajemen Kompetisi</strong>
      </li>
      <li>
        <a href="#">
          Semua Kompetisi<span className="label label-blue">245</span>
        </a>
      </li>
      <li>
        <Link to="/super/requests">
          Request Pasang Kompetisi<span className="label label-blue">245</span>
          <span className="label label-red">56</span>
        </Link>
      </li>

      {/* kabar */}
      <hr />
      <li>
        <strong>Manajemen Kabar </strong>
      </li>
      <li>
        <a href="#">
          Semua Berita<span className="label label-blue">24</span>
        </a>
      </li>

      {/* akun */}
      <hr />
      <li>
        <strong>Akun</strong>
      </li>
      <li>
        <a onClick={() => props.handleLogout()} href="javascript:;">
          Logout
        </a>
      </li>
    </ul>
  </div>
)
