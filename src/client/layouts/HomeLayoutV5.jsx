import React, { Component } from "react"
import * as Colors from "../../style/colors"

// components
import Footer from "../components/Footer"
import { renderRoutes, matchRoutes } from "react-router-config"
import Styled from "styled-components"
import Navbar from "../components/navigations/TransparentNavbar"
import Alert from "../components/Alert"
import FullScreenLoader from "../components/preloaders/FullPage"
import GAds from "../components/cards/GoogleAds"

const BackToTop = Styled.button`
  outline: none;
  transition: bottom .5s ease, top .5s ease;
  padding: 5px 10px; 
  background: ${Colors.mainWhite};
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 20px;
  color: ${Colors.mainGray};
  border: 1px solid ${Colors.softGray};
`

const LayoutStyled = Styled.div`
  min-height: 100%;
`

let addedEventScroll = false

class RootLayoutV5 extends Component {
  state = {
    showBtnTop: false
  }

  componentDidMount() {
    // scroll event listener
    document.addEventListener("scroll", e => {
      const position = window.scrollY
      if (position > 500) {
        if (!this.state.showBtnTop) this.setState({ showBtnTop: true })
      } else {
        if (this.state.showBtnTop) this.setState({ showBtnTop: false })
      }
    })

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
            <Navbar className="bg-gray" />
          </div>
        )}

        {renderRoutes(this.props.route.routes)}

        {/* gads */}
        {!fullscreen ? (
          <div className="col-md-12 align-center">
            <GAds
              // dummy={true}
              adClient="ca-pub-4468477322781117"
              adSlot={5218613800}
              // adTest={true}
            />
          </div>
        ) : null}
        {/* gads */}

        {fullscreen ? null : <Footer />}

        {/* button click to go top */}
        <BackToTop
          onClick={() => {
            document.getElementById("ki-logo").scrollIntoView({
              behavior: "smooth"
            })
          }}
          style={!this.state.showBtnTop ? { bottom: "-200px" } : {}}
        >
          <i className="fas fa-arrow-alt-circle-up" />
          &nbsp;
          <span>Kembali ke Atas</span>
        </BackToTop>
        <Alert />
        <FullScreenLoader />
      </LayoutStyled>
    )
  }
}

export default RootLayoutV5
