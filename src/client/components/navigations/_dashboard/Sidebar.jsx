import React from "react"

// components
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
          <Link to="/dashboard">Dashboard</Link>
        </li>

        {/* my competitions */}
        <hr />
        <li>
          {" "}
          <strong>Kompetisi Saya</strong>
        </li>

        <li>
          <Link to="/dashboard/competition/create">
            <i className="fas fa-plus" /> Kirim Kompetisi
          </Link>
        </li>

        {/* link to waiting competition */}
        {stats.competition && stats.competition.waiting ? (
          <li>
            <Link to="/dashboard/competition/waiting">
              Kompetisi Menunggu{" "}
              <span className="label label-red">
                {stats.competition.waiting}
              </span>
            </Link>
          </li>
        ) : null}

        {/* link to live competition */}
        {stats.competition && stats.competition.live ? (
          <li>
            <Link to="/dashboard/competition/live">
              Kompetisi Berlangsung{" "}
              <span className="label label-blue">{stats.competition.live}</span>
            </Link>
          </li>
        ) : null}

        {/* link to published competition */}
        {stats.competition && stats.competition.posted ? (
          <li>
            <Link to="/dashboard/competition/posted">
              Kompetisi Dipublikasi{" "}
              <span className="label label-blue">
                {stats.competition.posted}
              </span>
            </Link>
          </li>
        ) : null}

        {/* link to rejected competition */}
        {stats.competition && stats.competition.rejected ? (
          <li>
            <Link to="/dashboard/competition/rejected">
              Ditolak{" "}
              <span className="label label-blue">
                {stats.competition.rejected}
              </span>
            </Link>
          </li>
        ) : null}

        <hr />
        <li>
          {" "}
          <strong>Kompetisi Lainnya</strong>
        </li>

        {/* subscribed competition */}
        <li>
          <Link to="/dashboard/competition/subscribed">
            Kompetisi Disubscribe{" "}
            {/* <span className="label label-blue">
              {stats.competition.subscribed}
            </span> */}
          </Link>
        </li>
        {/* end of subscribec competition */}

        {/* liked competition */}
        <li>
          <Link to="/dashboard/competition/liked">Kompetisi Disukai</Link>
        </li>
        {/* end of liked competition */}

        {/* end of competition */}

        {/* settings */}
        <hr />
        <li>
          {" "}
          <strong>Pengaturan</strong>
        </li>
        <li>
          <Link to="/settings/profile">Pengaturan Profil</Link>
        </li>
        <li>
          <Link to="/settings/account">Pengaturan Akun</Link>
        </li>
        {/* <li>
          <Link to="/settings/connect-social-media">
            Hubungkan Ke Sosial Media
          </Link>
        </li> */}
        {/* end of settings */}

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
