import React from "react"
import { Link } from "react-router-dom"

export default props => {
  const stats =
    props.stats && props.stats.status === 200
      ? props.stats
      : { request: {}, competition: {}, news: {}, members: {} }

  return (
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
          <strong>Kompetisi</strong>
        </li>
        <li>
          <Link to="/super/competition/create">
            <i className="fas fa-plus" /> Tambah Kompetisi
          </Link>
        </li>
        {stats.competition.waiting ? 
          <li>
            <Link to="/super/competition/waiting">
              Kompetisi Menunggu{" "}
              <span className="label label-red">
                {stats.competition.waiting}
              </span>
            </Link>
          </li>
        : null}
        <li>
          <Link to="/super/competition/live">
            Kompetisi Berlangsung{" "}
            <span className="label label-blue">{stats.competition.live}</span>
          </Link>
        </li>
        <li>
          <Link to="/super/competition/posted">
            Kompetisi Terpublikasi{" "}
            <span className="label label-blue">{stats.competition.posted}</span>
          </Link>
        </li>

        {/* request */}
        <hr />
        <li>
          <strong>Managemen Request</strong>
        </li>
        <li>
          <Link to="/super/requests">
            Request Pasang Kompetisi{" "}
            <span className="label label-blue">{stats.request.total}</span>
            {stats.request.waiting ? (
              <span className="label label-red">{stats.request.waiting}</span>
            ) : null}
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
            Semua Berita{" "}
            <span className="label label-blue">{stats.news.posted}</span>
          </Link>
        </li>

        {/* member */}
        <hr />
        <li>
          <strong>Members</strong>
        </li>
        <li>
          <Link to="/super/members/active">
            Member Aktif{" "}
            <span className="label label-blue">{stats.members.active}</span>
          </Link>
        </li>
        <li>
          <Link to="/super/members/banned">
            Member Banned{" "}
            <span className="label label-blue">{stats.members.banned}</span>
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
}
