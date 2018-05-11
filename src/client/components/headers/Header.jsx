import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { logout } from '../../../store/user/actions'

class Header extends Component {
  handleSearch(e) {
    if (e.keyCode == 13) {
      return (window.location.href = `/browse?q=${this.props.q}`)
    }
  }

  handleLogout() {
    fullalert('warning', 'logout...')
    this.props.dispatch(logout())
  }

  componentWillReceiveProps(np) {
    const { logout } = np
    if (logout.meta) {
      if (logout.meta.code === 201) {
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)
        fullalert('success', logout.meta.message, false)
      } else {
        fullalert('error', logout.meta.message, false)
      }
    }
  }

  render() {
    const { q, session } = this.props
    return (
      <nav>
        <div style={{ top: q ? '-50px' : '0px' }} className="nav-header">
          <a id="btn-menu" href="javascript:;">
            <span className="fa fa-bars" />
          </a>
          <div className="nav-left">
            <a className="only-mobile" href="javascript:;" id="btn-show-nav">
              <img
                src="/assets/4.2/img/icon-128x128.png"
                style={{ width: '40px' }}
              />
            </a>
            <ul className="top-menu" id="top-menu">
              <a
                style={{ position: 'absolute', top: '0.5em', right: '0.5em' }}
                id="btn-hide-nav"
                className=" btn-close-nav only-mobile fa fa-close"
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
            <Link className='stage' to="/">
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
                  {' '}
                  <span className="fa fa-search" />
                </a>
              </li>
              {session && session.meta && session.meta.code == 201 ? (
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
                          <Link to={`/user/${session.data.username}`}>
                            Profil saya
                          </Link>
                        </li>
                        <li>
                          <Link to={`/dashboard/competition/live`}>
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link to="/settings">Setelan</Link>
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
                <li style={{ display: 'none' }} className="hide-mobile">
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
            value={q || ''}
            placeholder="tekan enter untuk submit"
            onChange={e => this.props.setState({ q: e.target.value })}
            onKeyDown={e => this.handleSearch(e)}
          />
          <a
            id="btn-closesearch"
            onClick={() => {
              if (q != '') return (window.location.href = '/browse')
            }}
            href="javascript:;"
            title="tutup pencarian"
          >
            {' '}
            <span className="fa fa-close" />
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

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
