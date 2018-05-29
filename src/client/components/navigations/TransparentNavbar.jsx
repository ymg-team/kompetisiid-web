import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import Styled from 'styled-components'
import { queryToObj } from 'string-manager'

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
    this.setState({
      search: !this.state.search
    }, () => {
      this.props.history.push('/browse')
    })
  }

  render() {
    let logo = '/assets/images/small-white-logo-transparent.png'
    if (this.props.className === 'bg-gray')
      logo = '/assets/images/small-gray-logo-transparent.png'

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

export default withRouter(Navbar)
