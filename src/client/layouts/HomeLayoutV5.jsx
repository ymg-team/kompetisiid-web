import React, { Component } from "react"
import Footer from "../components/Footer"
import { renderRoutes, matchRoutes } from "react-router-config"
import Styled from "styled-components"
import Navbar from "../components/navigations/TransparentNavbar"
import Alert from "../components/Alert"
import FullScreenLoader from "../components/preloaders/FullPage"
import GAds from '../components/cards/GoogleAds'

const LayoutStyled = Styled.div`
  min-height: 100%;
`

let addedEventScroll = false

class RootLayoutV5 extends Component {
  componentDidMount() {
    // Google Analytics handler
    this.props.history.listen(location => {
      if (window.ga) {
        // ref : https://developers.google.com/analytics/devguides/collection/gajs/
        ga("send", "pageview", location.pathname + location.search)
      }
    })
  }

  render() {
    const { fullscreen } = matchRoutes(
      this.props.route.routes,
      this.props.location.pathname
    )[0].route
    return (
      <LayoutStyled>
        {this.props.location.pathname === "/" || fullscreen ? null : (
          <div style={{ backgroundColor: "rgb(228, 228, 228)" }}>
            <div className="container">
              <div className="row">
                <Navbar className="bg-gray" />
              </div>
            </div>
          </div>
        )}

        {renderRoutes(this.props.route.routes)}

        {/* gads */}
        {!fullscreen ? (
          <div className="row align-center">
            <GAds
              // dummy={true}
              style={{marginTop:0}}
              adClient="ca-pub-4468477322781117"
              adSlot={5218613800}
              // adTest={true}
            />
          </div>
        ) : null}
        {/* gads */}

        {fullscreen ? null : <Footer />}
        <Alert />
        <FullScreenLoader />
      </LayoutStyled>
    )
  }
}

export default RootLayoutV5
