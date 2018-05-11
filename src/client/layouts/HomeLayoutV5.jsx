import React, { Component } from 'react'
import Footer from "../components/Footer"
import { renderRoutes } from 'react-router-config'
import Styled from 'styled-components'
import Navbar from '../components/navigations/TransparentNavbar'

const LayoutStyled = Styled.div`
  min-height: 100%;
`

class RootLayoutV5 extends Component {
  render() {
    return (
      <LayoutStyled>
        {this.props.location.pathname !== '/' ? (
          <div
            style={{ backgroundColor: 'rgb(228, 228, 228)' }}
          >
            <div className="container">
              <div className="row">
                <Navbar className="bg-gray" />
              </div>
            </div>
          </div>
        ) : null}
        {renderRoutes(this.props.route.routes)}
        <Footer />
        <div id="fullalert" />
      </LayoutStyled>
    )
  }
}

export default RootLayoutV5
