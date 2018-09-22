import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import Styled from "styled-components"
import { queryToObj } from "string-manager"
import * as Colors from "../../../style/colors"

// components
import { Link } from "react-router-dom"

const StickyNavbarStyled = Styled.div`
  width: 100%;
  transition: top .5s ease;
  &.sticky {
    position: fixed;
    top: -100px;
    background: #ffffffde;
    color: ${Colors.mainGray};
    z-index: 20;
    a {
      color: ${Colors.mainGray};
    }
    input[type="search"] {
      border-bottom: 2px solid ${Colors.mainGray};
      color: ${Colors.mainGray};
    }
    .bg-gray {
      background: transparent;
    }
  }
`

const NavbarStyled = Styled.div`

  #ki-logo {
    width: 40px; 
    height: 40px;
    display: block;
    background-size: contain;
  }

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

    const query = queryToObj(props.location.search.replace("?", ""))
    this.state = {
      search: typeof query.q !== "undefined",
      keyword: query.q || "",
      sticky: false,
      styleNavbar: {}
    }
    this.handleStickyNavbar = this.handleStickyNavbar.bind(this)
  }

  componentDidMount() {
    // scroll event listener
    document.addEventListener("scroll", this.handleStickyNavbar)
  }

  componentWillUnmount() {
    // remove event listener
    document.removeEventListener("scroll", this.handleStickyNavbar)
  }

  handleStickyNavbar(e) {
    const position = window.scrollY
    if (position > 500) {
      if (!this.state.sticky) {
        this.setState({ sticky: true })
        setTimeout(() => {
          this.setState({
            styleNavbar: { top: 0 }
          })
        }, 100)
      }
    } else {
      if (this.state.sticky) {
        this.setState({
          sticky: false,
          styleNavbar: { top: "-100px", position: "fixed" }
        })
        setTimeout(() => {
          this.setState({
            styleNavbar: {}
          })
        }, 100)
      }
    }
  }

  UNSAFE_componentWillReceiveProps(np) {
    const query = queryToObj(np.location.search.replace("?", ""))
    this.setState({
      search: typeof query.q !== "undefined",
      keyword: query.q
    })
  }

  toggleSearch() {
    this.setState(
      {
        search: !this.state.search,
        keyword: ""
      },
      () => {
        if (!this.state.search) this.props.history.push("/browse")
      }
    )
  }

  render() {
    let logo = "/assets/images/small-white-logo-transparent.png"
    if (this.props.className === "bg-gray")
      logo = "/assets/images/small-gray-logo-transparent.png"
    if (this.state.sticky)
      logo = "/assets/images/small-red-logo-transparent.png"

    const { session } = this.props

    return (
      <StickyNavbarStyled
        style={this.state.styleNavbar}
        className={`${this.state.sticky ? "sticky" : ""}`}
      >
        <div className="container">
          <NavbarStyled className={`${this.props.className} row`}>
            {this.state.search ? (
              <SearchStyled>
                <div className="col-xs-12">
                  <ul className="inline-list inline-list-left">
                    <li style={{ padding: 0 }}>
                      <Link
                        id="ki-logo"
                        to="/"
                        style={{ backgroundImage: `url(${logo})` }}
                      />
                    </li>
                    <li style={{ width: "calc(100% - 40px - 40px)" }}>
                      <input
                        type="search"
                        autoFocus={true}
                        value={this.state.keyword}
                        onChange={e =>
                          this.setState({
                            keyword: e.target.value || ""
                          })
                        }
                        onKeyDown={e => {
                          if (
                            e.keyCode === 13 &&
                            this.state.keyword.trim() !== ""
                          )
                            this.props.history.push(
                              `/browse?q=${this.state.keyword}`
                            )
                        }}
                      />
                    </li>
                    <li>
                      <a
                        onClick={() => this.toggleSearch()}
                        className="fas fa-times"
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
                      <Link
                        id="ki-logo"
                        to="/"
                        style={{ backgroundImage: `url(${logo})` }}
                      />
                      {/* <Link to="/">
                      <img
                        id="ki-logo"
                        src={logo}
                        alt="kompetisi.id transparent logo"
                      />
                    </Link> */}
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
                        className="fas fa-search"
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
                      <li style={{ padding: "5px 10px" }}>
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
                      <li style={{ display: "none" }} className="hide-mobile">
                        <Link to="/login">login</Link>
                      </li>
                    )}
                    {/* end of auth */}
                  </ul>
                </div>
              </div>
            )}
          </NavbarStyled>
        </div>
      </StickyNavbarStyled>
    )
  }
}

Navbar.defaultProps = {
  className: ""
}

function mapStateToProps(state) {
  const { User } = state
  return {
    session: User.session
  }
}

export default connect(mapStateToProps)(withRouter(Navbar))
