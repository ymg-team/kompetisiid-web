import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Styled from 'styled-components'
import { queryToObj } from 'string-manager'

// components
import { Link } from 'react-router-dom'

const NavbarStyled = Styled.div`
  padding: .5em 0;
  transition: all .5s ease;

  &.fixed {
    position: fixed;
    width: 100%;
    z-index: 10;
  }

  &.bg-gray {
    color: #3a3a3a;
    a {
      color: #3a3a3a;
    }
    input[type="search"] {
      border-bottom: 2px solid #3a3a3a;
      color: #3a3a3a;
    }
  }

  img#ki-logo {
    width: 40px;
    height: 40px;
  }

  a {
    transition: all .5s ease;
    color: #FFF;
    text-decoration: none;
    &:hover {
      font-weight: bold 
    }
  }

  ul.inline-list {
    height: 40px;
    li {
      padding: 10px
    }
  }
`

const SearchStyled = Styled.div`
  input[type="search"] {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 2px solid #FFF;
    color: #FFF;
    outline: none;
  }
`

class Navbar extends Component {
  constructor(props) {
    super(props)

    const query = queryToObj(props.location.search.replace('?', ''))
    this.state = {
      search: typeof query.q !== 'undefined',
      keyword: query.q || ''
    }
  }

  componentWillReceiveProps(np) {
    const query = queryToObj(np.location.search.replace('?', ''))
    this.setState({
      search: typeof query.q !== 'undefined',
      keyword: query.q
    })
  }

  toggleSearch() {
    this.setState(
      {
        search: !this.state.search
      },
      () => {
        if (!this.state.search) this.props.history.push('/browse')
      }
    )
  }

  render() {
    let logo = '/assets/images/small-white-logo-transparent.png'
    if (this.props.className === 'bg-gray')
      logo = '/assets/images/small-gray-logo-transparent.png'

    const { session } = this.props

    return (
      <NavbarStyled className={`${this.props.className} row`}>
        {this.state.search ? (
          <SearchStyled>
            <div className="col-xs-12">
              <ul className="inline-list inline-list-left">
                <li style={{ padding: 0 }}>
                  <Link to="/">
                    <img
                      id="ki-logo"
                      src={logo}
                      alt="kompetisi.id transparent logo"
                    />
                  </Link>
                </li>
                <li style={{ width: 'calc(100% - 40px - 40px)' }}>
                  <input
                    type="search"
                    autoFocus={true}
                    value={this.state.keyword}
                    onChange={e =>
                      this.setState({
                        keyword: e.target.value
                      })
                    }
                    onKeyDown={e => {
                      if (e.keyCode === 13 && this.state.keyword.trim() !== '')
                        this.props.history.push(
                          `/browse?q=${this.state.keyword}`
                        )
                    }}
                  />
                </li>
                <li>
                  <a
                    onClick={() => this.toggleSearch()}
                    className="fa fa-close"
                    href="javascript:;"
                  />
                </li>
              </ul>
            </div>
          </SearchStyled>
        ) : (
          <div>
            <div className="col-xs-6">
              <ul className="inline-list inline-list-left">
                <li style={{ padding: 0 }}>
                  <Link to="/">
                    <img
                      id="ki-logo"
                      src={logo}
                      alt="kompetisi.id transparent logo"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="/browse">Jelajah</Link>
                </li>
                <li>
                  <Link to="/add">Pasang</Link>
                </li>
                <li>
                  <Link to="/news">Kabar</Link>
                </li>
              </ul>
            </div>
            <div className="col-xs-6">
              <ul className="inline-list inline-list-right">
                <li>
                  <a
                    onClick={() => this.toggleSearch()}
                    className="fa fa-search"
                    href="javascript:;"
                  />
                </li>

                {/* <li>
              <Link to="/news">
                Login
                <i className="fa sort-down"/>
              </Link>
            </li> */}

                {/* auth */}
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
                            <Link to={`/user/user/${session.username}`}>
                              Profil saya
                            </Link>
                          </li>
                          <li>
                            <Link to={`/dashboard/`}>Dashboard</Link>
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
                {/* end of auth */}
              </ul>
            </div>
          </div>
        )}
      </NavbarStyled>
    )
  }
}

Navbar.defaultProps = {
  className: ''
}

function mapStateToProps(state) {
  const { User } = state
  return {
    session: User.session
  }
}

export default connect(mapStateToProps)(withRouter(Navbar))
