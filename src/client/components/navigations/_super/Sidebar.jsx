import React from "react"
import Styled from "styled-components"
import { Link } from "react-router-dom"

const SidebarMobileStyle = `
  background: #ececec;
  position: fixed;
  z-index: 1;
  height: 100vh;
  left: -100%;
  top: 57px;
  transition: all .5s ease;
  padding: 0 15px; 
  overflow: auto;
  &.active {
    left: 0;
  } 
`

export const SidebarStyled = Styled.div`
ul {
  list-style: none;
  padding: 0;
  li {
    padding: 0.5em 0;
    strong {
      margin-top: 30px;
      display: block;
    }
    a {
      text-decoration: none;
      &:hover, &:focus, &.active {
        font-weight: bold;
      }
    }
    &.active {
      a {
        font-weight: bold;
      }
    }
    
  }
}

// responsiveness

// small screen
@media only screen and (max-width: 543px) {
  ${SidebarMobileStyle}
}

// medium screen
@media only screen and (min-width: 544px) and (max-width: 767px) {
  ${SidebarMobileStyle}
}
`

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
          <Link to="/super/dashboard">Dashboard</Link>
        </li>

        {/* competition */}
        <hr className="hide-mobile" />
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
        <hr className="hide-mobile" />
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
        <hr className="hide-mobile" />
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
            Draft <span className="label label-blue">{stats.news.draft}</span>
          </Link>
        </li>

        {/* User */}
        <hr className="hide-mobile" />
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
        <hr className="hide-mobile" />
        <li>
          <strong>Akun</strong>
        </li>
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
      </ul>
    </SidebarStyled>
  )
}
