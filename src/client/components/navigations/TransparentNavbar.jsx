import React, { Component } from "react"
import { connect } from "react-redux"
import Styled from "styled-components"
import { queryToObj } from "string-manager"
import * as Colors from "../../../style/colors"
import { logout } from "../../../store/user/actions"

// components
import { Link } from "react-router-dom"

const Menus = [
  {
    link: "/browse",
    text: "Jelajah",
    title: "Jelajahi kompetisi dari berbagai kategori"
  },
  {
    link: "/add",
    text: "Pasang",
    title: "Pasang Kompetisi disini, gratis!"
  },
  {
    link: "/news",
    text: "Kabar",
    title: "Kumpulan kabar seputar Kompetisi di Indonesia"
  }
]

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

  #btn-sidebar {
    font-size: 32px;
    display: none;
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
    // color: #FFF;
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

  #avatar-menu {
    a {
      color: ${Colors.mainGray}
    }
  }

  // responsiveness
  // small screen
  @media only screen and (max-width: 543px) {
    #btn-sidebar {
      display: block;
    }
  }

  // medium screen
  @media only screen and (min-width: 544px) and (max-width: 767px) {
    #btn-sidebar {
      display: block;
    }
  }

`

const SearchStyled = Styled.div`
  input[type="search"] {
    width: 100%;
    background: transparent;
    outline: none;
    border: none;
    border-bottom: 2px solid ${Colors.mainGray};
    color: ${Colors.mainGray};
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
      styleNavbar: {},
      showSidebar: false
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
    // trigger hide sidebar, set to default
    if (this.state.showSidebar) this.setState({ showSidebar: false })
  }

  handleStickyNavbar(e) {
    const position = window.scrollY
    if (position > 500) {
      const pathArr = window.location.pathname.split("/")
      if (!this.state.sticky && pathArr[1] !== "competition") {
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
        if (!this.state.search) window.transitionTo("/browse")
      }
    )
  }

  render() {
    const session = this.props.user.session || {}
    const pathnameArr = this.props.location.pathname.split("/")

    return (
      <StickyNavbarStyled
        style={this.state.styleNavbar}
        className={`${this.state.sticky ? "sticky" : ""}`}
      >
        <div className="container">
          <NavbarStyled
            session={session}
            className={`${this.props.className} row`}
          >
            {this.state.search ? (
              <SearchStyled>
                <div className="col-xs-12">
                  <ul className="inline-list inline-list-left">
                    <li style={{ padding: "0 12px" }}>
                      <Link
                        id="ki-logo"
                        to="/"
                        style={{
                          backgroundImage: `url(/assets/images/small-red-logo-transparent.png)`
                        }}
                      />
                    </li>
                    <li
                      style={{
                        width: "calc(100% - 40px - 40px - 10px)",
                        paddingTop: 6
                      }}
                    >
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
                            window.transitionTo(
                              `/browse?q=${this.state.keyword}`
                            )
                        }}
                      />
                    </li>
                    <li>
                      <a
                        onClick={e => {
                          e.preventDefault()
                          this.toggleSearch()
                        }}
                        className="fas fa-times"
                        href="#"
                      />
                    </li>
                  </ul>
                </div>
              </SearchStyled>
            ) : (
              <React.Fragment>
                <div style={{ padding: 0 }} className="col-xs-6">
                  <ul className="inline-list inline-list-left">
                    {/* button to toggle sidebar on super and dashboard */}
                    {["super", "dashboard"].includes(pathnameArr[1]) ? (
                      <li style={{ padding: "0px 12px" }}>
                        <a
                          href="#"
                          id="btn-sidebar"
                          onClick={e => {
                            e.preventDefault()
                            const sidebarEl = document.getElementById(
                              "dashboard-sidebar"
                            )
                            if (sidebarEl) {
                              sidebarEl.style.left = this.state.showSidebar
                                ? "-100%"
                                : "0"
                              this.setState({
                                showSidebar: !this.state.showSidebar
                              })
                            }
                          }}
                        >
                          <i
                            className="fas fa-bars"
                            style={{ paddingTop: 6 }}
                          />
                        </a>
                      </li>
                    ) : null}
                    {/* end of button to toggle sidebar on super and dashboard */}

                    <li style={{ padding: "0px 12px" }}>
                      <Link
                        id="ki-logo"
                        to="/"
                        style={{
                          backgroundImage: `url(/assets/images/small-red-logo-transparent.png)`
                        }}
                      />
                    </li>
                    {Menus.map(n => (
                      <li key={n.link}>
                        <Link title={n.title} to={n.link}>
                          {n.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ padding: 0 }} className="col-xs-6">
                  <ul className="inline-list inline-list-right">
                    <li>
                      <a
                        onClick={e => {
                          e.preventDefault(e)
                          this.toggleSearch()
                        }}
                        className="fas fa-search"
                        href="#"
                      />
                    </li>

                    {/* auth */}
                    {typeof session.id !== "undefined" ? (
                      <div
                        key="loggedin"
                        style={{
                          marginTop: -3,
                          marginRight: 35,
                          padding: "5px 10px",
                          float: "right"
                        }}
                      >
                        <div
                          style={{ position: "absolute" }}
                          className="dropdown"
                        >
                          <a
                            className="avatar"
                            href="#"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              className="dropdown-button"
                              src={
                                session.avatar && session.avatar.small
                                  ? session.avatar.small
                                  : "/assets/4.2/img/avatar-default.jpg"
                              }
                              data-target="avatar-menu"
                            />
                          </a>
                          <div className="dropdown-items" id="avatar-menu">
                            <ul>
                              <li>
                                <a href={`/user/${session.username}`}>
                                  Profil saya
                                </a>
                              </li>
                              {["admin", "moderator"].includes(
                                session.level
                              ) ? (
                                <li>
                                  <a href={`/super/dashboard`}>Super</a>
                                </li>
                              ) : null}
                              <li>
                                <a href={`/dashboard`}>Dashboard</a>
                              </li>
                              <li>
                                <a href="/settings/profile">
                                  Pengaturan Profil
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  onClick={e => {
                                    e.preventDefault()
                                    this.props.dispatch(logout())
                                  }}
                                >
                                  Logout
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <li key="public">
                        <Link to="/login">Login</Link>
                      </li>
                    )}
                    {/* end of auth */}
                  </ul>
                </div>
              </React.Fragment>
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
  return {
    user: state.User
  }
}

export default connect(mapStateToProps)(Navbar)
