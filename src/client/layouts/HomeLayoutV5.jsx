import React, { Component } from 'react'
import Footer from '../components/Footer'
import { renderRoutes, matchRoutes } from 'react-router-config'
import Styled from 'styled-components'
import Navbar from '../components/navigations/TransparentNavbar'
import Alert from '../components/Alert'

const LayoutStyled = Styled.div`
  min-height: 100%;
`

let addedEventScroll = false

class RootLayoutV5 extends Component {
  componentDidMount() {}

  render() {
    const { fullscreen } = matchRoutes(this.props.route.routes, this.props.location.pathname)[0].route
    return (
      <LayoutStyled>
        {this.props.location.pathname === '/' || fullscreen ? null : (
          <div style={{ backgroundColor: 'rgb(228, 228, 228)' }}>
            <div className="container">
              <div className="row">
                <Navbar className="bg-gray" />
              </div>
            </div>
          </div>
        )}
        {renderRoutes(this.props.route.routes)}
        {fullscreen ? null : <Footer /> }
        <Alert />
      </LayoutStyled>
    )
  }
}

export default RootLayoutV5
