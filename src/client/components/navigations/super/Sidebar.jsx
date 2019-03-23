import React from "react"
import { Link } from "react-router-dom"

export default props => (
  <div className="dashboard-sidebar">
    <ul>
      <li>
        {" "}
        <Link to="/super/dashboard">Dashboard</Link>
      </li>

      {/* competition */}
      <hr />
      <li>
        {" "}
        <strong>Manajemen Kompetisi</strong>
      </li>
      <li>
        <Link to="/super/competition/create">
          <i className="fas fa-plus" /> Tambah Kompetisi
        </Link>
      </li>
      <li>
        <Link to="/super/competition">
          Semua Kompetisi Terpasang
          <span className="label label-blue">245</span>
        </Link>
      </li>
      <li>
        <Link to="/super/requests">
          Request Pasang Kompetisi
          <span className="label label-blue">245</span>
          <span className="label label-red">56</span>
        </Link>
      </li>

      {/* kabar */}
      <hr />
      <li>
        <strong>Manajemen Kabar </strong>
      </li>
      <li>
        <Link to="/super/news/create">
          <i className="fas fa-plus" /> Tambah Berita
        </Link>
      </li>
      <li>
        <Link to="/super/news">
          Semua Berita
          <span className="label label-blue">24</span>
        </Link>
      </li>

      {/* member */}
      <hr />
      <li>
        <strong>Members</strong>
      </li>
      <li>
        <Link to="/super/members">
          Semua Member
          <span className="label label-blue">24</span>
        </Link>
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
