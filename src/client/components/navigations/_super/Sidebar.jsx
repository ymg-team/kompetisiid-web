import React from "react"
import Styled from "styled-components"

// components
import { Link } from "react-router-dom"
import Label from "../../Label"

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
              Menunggu&nbsp;
              <Label type="red" text={stats.competition.waiting} />
            </Link>
          </li>
        ) : null}
        <li>
          <Link to="/super/competition/live">
            Berlangsung&nbsp;
            <Label type="blue" text={stats.competition.live} />
          </Link>
        </li>
        <li>
          <Link to="/super/competition/posted">
            Dipublikasi&nbsp;
            <Label type="blue" text={stats.competition.posted} />
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
            <Label type="blue" text={stats.request.total} />
            {stats.request.waiting ? (
              <Label type="red" text={stats.request.waiting} />
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
            Diposting <Label type="blue" text={stats.news.posted} />
          </Link>
        </li>
        <li>
          <Link to="/super/news/draft">
            Draft&nbsp;
            <Label type="blue" text={stats.news.draft} />
          </Link>
        </li>

        {/* User */}
        <hr className="hide-mobile" />
        <li>
          <strong>Users</strong>
        </li>
        <li>
          <Link to="/super/users/confirmed">
            Telah Konfirmasi &nbsp;
            <Label type="blue" text={stats.members.verified} />
          </Link>
        </li>
        <li>
          <Link to="/super/users/unconfirmed">
            Belum Konfirmasi&nbsp;
            <Label type="blue" text={stats.members.unverified} />
          </Link>
        </li>
        <li>
          <Link to="/super/users/banned">
            Dicekal&nbsp;
            <Label type="blue" text={stats.members.banned} />
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
