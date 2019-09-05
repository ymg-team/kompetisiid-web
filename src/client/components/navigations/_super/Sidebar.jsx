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
        {stats.competition.waiting ? (
          <li>
            <Link to="/super/competition/waiting">
              Menunggu{" "}
              <span className="label label-red">
                {stats.competition.waiting}
              </span>
            </Link>
          </li>
        ) : null}
        <li>
          <Link to="/super/competition/live">
            Berlangsung{" "}
            <span className="label label-blue">{stats.competition.live}</span>
          </Link>
        </li>
        <li>
          <Link to="/super/competition/posted">
            Dipublikasi{" "}
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
            <i className="fas fa-plus" /> Tambah Kabar
          </Link>
        </li>
        <li>
          <Link to="/super/news/posted">
            Diposting{" "}
            <span className="label label-blue">{stats.news.posted}</span>
          </Link>
        </li>
        <li>
          <Link to="/super/news/draft">
            Draft{" "}
            <span className="label label-blue">{stats.news.draft}</span>
          </Link>
        </li>

        {/* User */}
        <hr />
        <li>
          <strong>Users</strong>
        </li>
        <li>
          <Link to="/super/users/confirmed">
            Telah Konfirmasi{" "}
            <span className="label label-blue">{stats.members.verified}</span>
          </Link>
        </li>
        <li>
          <Link to="/super/users/unconfirmed">
            Belum Konfirmasi{" "}
            <span className="label label-blue">{stats.members.unverified}</span>
          </Link>
        </li>
        <li>
          <Link to="/super/users/banned">
            Dicekal{" "}
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
