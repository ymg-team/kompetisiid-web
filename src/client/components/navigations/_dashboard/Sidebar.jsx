import React from "react"

// components
import { SidebarStyled } from "../_super/Sidebar"
import { Link } from "react-router-dom"
import Label from "../../Label"

export default props => {
  const stats =
    props.stats && props.stats.status === 200
      ? props.stats
      : { request: {}, competition: {}, news: {}, members: {} }
  return (
    <SidebarStyled className="dashboard-sidebar" id="dashboard-sidebar">
      <ul>
        <li>
          {" "}
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <hr className="hide-mobile" />

        {/* my competitions */}
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
              <Label type="red" text={stats.competition.waiting} />
            </Link>
          </li>
        ) : null}

        {/* link to live competition */}
        {stats.competition && stats.competition.live ? (
          <li>
            <Link to="/dashboard/competition/live">
              Kompetisi Berlangsung{" "}
              <Label type="blue" text={stats.competition.live} />
            </Link>
          </li>
        ) : null}

        {/* link to published competition */}
        {stats.competition && stats.competition.posted ? (
          <li>
            <Link to="/dashboard/competition/posted">
              Kompetisi Dipublikasi{" "}
              <Label type="blue" text={stats.competition.posted} />
            </Link>
          </li>
        ) : null}

        {/* link to rejected competition */}
        {stats.competition && stats.competition.rejected ? (
          <li>
            <Link to="/dashboard/competition/rejected">
              Ditolak <Label type="blue" text={stats.competition.rejected} />
            </Link>
          </li>
        ) : null}

        <li>
          {" "}
          <strong>Kompetisi Lainnya</strong>
        </li>

        {/* subscribed competition */}
        <li>
          <Link to="/dashboard/competition/subscribed">
            Kompetisi Disubscribe{" "}
          </Link>
        </li>
        {/* end of subscribec competition */}

        {/* liked competition */}
        <li>
          <Link to="/dashboard/competition/liked">Kompetisi Disukai</Link>
        </li>
        {/* end of liked competition */}

        {/* end of competition */}

        <hr className="hide-mobile" />

        {/* settings */}
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
        <li>
          <a
            onClick={e => {
              e.preventDefault()
              props.handleLogout()
            }}
            href="#"
          >
            Logout
          </a>
        </li>
        {/* end of logout from dashboard */}
      </ul>
    </SidebarStyled>
  )
}
