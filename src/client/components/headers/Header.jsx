import React, { Component } from "react"
import { Link } from "react-router-dom"

import { alert } from "../Alert"
import { connect } from "react-redux"
import { logout } from "../../containers/user/actions"

class Header extends Component {
  handleSearch(e) {
    if (e.keyCode == 13) {
      return (window.location.href = `/browse?q=${this.props.q}`)
    }
  }

  handleLogout() {
    alert(true, "logout...", "warning")
    this.props.dispatch(logout())
  }

  UNSAFE_componentWillReceiveProps(np) {
    const { logout } = np
    if (logout.meta) {
      if (logout.meta.code === 201) {
        setTimeout(() => {
          window.location.href = "/"
        }, 1500)
        alert(true, logout.meta.message, "success", false)
      } else {
        alert(true, logout.meta.message, "error")
      }
    }
  }

  render() {
    const { q, session } = this.props
    return (
      <nav>
        <div style={{ top: q ? "-50px" : "0px" }} className="nav-header">
          <a id="btn-menu" href="javascript:;">
            <span className="fa fa-bars" />
          </a>
          <div className="nav-left">
            <a className="only-mobile" href="javascript:;" id="btn-show-nav">
              <img
                src="/assets/4.2/img/icon-128x128.png"
                style={{ width: "40px" }}
              />
            </a>
            <ul className="top-menu" id="top-menu">
              <a
                style={{ position: "absolute", top: "0.5em", right: "0.5em" }}
                id="btn-hide-nav"
                className=" btn-close-nav only-mobile fas fa-times"
                href="javascript:;"
              />
              <li>
                <Link onClick={() => toggleNavTop()} to="/browse">
                  jelajah
                </Link>
              </li>
              <li>
                <Link onClick={() => toggleNavTop()} to="/add">
                  pasang
                </Link>
              </li>
              <li>
                <Link onClick={() => toggleNavTop()} to="/news">
                  kabar
                </Link>
              </li>
              {/*
                session && session.meta && session.meta.code == 201 ? 
                null : 
                <li className='only-mobile'>
                    <Link to='/login'>login</Link>
                </li>
            */}
            </ul>
          </div>
          <div className="logo hide-mobile">
            <Link className="stage" to="/">
              <img id="ki-logo" src="/assets/4.2/img/icon-128x128.png" />
            </Link>
          </div>
          <div className="nav-right">
            <ul className="top-menu">
              <li>
                <a
                  id="btn-search"
                  href="javascript:;"
                  title="click untuk melakukan pencarian"
                >
                  {" "}
                  <span className="fa fa-search" />
                </a>
              </li>
              {Object.keys(session).length > 0 && session.id ? (
                <li>
                  <div className="dropdown">
                    <a className="avatar" href="javascript:;">
                      <img
                        className="dropdown-button"
                        src="/assets/4.2/img/avatar-default.jpg"
                        data-target="avatar-menu"
                      />
                    </a>
                    <div className="dropdown-items" id="avatar-menu">
                      <ul>
                        <li>
                          <Link to={`/user/${session.username}`}>
                            Profil saya
                          </Link>
                        </li>
                        <li>
                          {["admin", "moderator"].includes(session.level) ? (
                            <Link to={`/super/dashboard`}>Super</Link>
                          ) : (
                            <Link to={`/dashboard/`}>Dashboard</Link>
                          )}
                        </li>
                        <li>
                          <Link to="/settings/profile">Pengaturan Profil</Link>
                        </li>
                        <li>
                          <a
                            href="javascript:;"
                            onClick={() => this.handleLogout()}
                          >
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ) : (
                <li style={{ display: "none" }} className="hide-mobile">
                  <Link to="/login">login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="nav-search">
          <label htmlFor="search">Pencarian </label>
          <input
            type="text"
            value={q || ""}
            placeholder="tekan enter untuk submit"
            onChange={e => this.props.setState({ q: e.target.value })}
            onKeyDown={e => this.handleSearch(e)}
          />
          <a
            id="btn-closesearch"
            onClick={() => {
              if (q != "") return (window.location.href = "/browse")
            }}
            href="javascript:;"
            title="tutup pencarian"
          >
            {" "}
            <span className="fas fa-times" />
          </a>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  const { User } = state
  return {
    session: User.session,
    logout: User.logout
  }
}

export default connect(
  mapStateToProps
)(Header)
