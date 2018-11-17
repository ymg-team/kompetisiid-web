import React, { Component } from "react"
import { connect } from "react-redux"
import * as Colors from "../../style/colors"
import { initModalImages } from "../helpers/Modal"
import { resendEmailValidationToken } from "../containers/user/actions"

// components
import Footer from "../components/Footer"
import { renderRoutes, matchRoutes } from "react-router-config"
import Styled from "styled-components"
import Navbar from "../components/navigations/TransparentNavbar"
import Alert from "../components/Alert"
import FullScreenLoader from "../components/preloaders/FullPage"
import ImageModal from "../components/modals/ImageModal"
import GAds from "../components/cards/GoogleAds"

const StickyNoteStyle = {
  position: "fixed",
  bottom: 0,
  zIndex: 50,
  background: "#e74c3c",
  color: "#FFF",
  textAlign: "center",
  padding: "10px",
  width: "100%",
  fontWeight: "bold"
}

const StickyNoteLinkStyle = {
  color: "#FFF",
  textDecoration: "underline"
}

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

  resendEmailVerification = () => {}

  componentDidMount = () => {
    // init modal images
    initModalImages()

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

  render = () => {
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
            // ref: https://stackoverflow.com/a/1145012/2780875
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          style={!this.state.showBtnTop ? { bottom: "-200px" } : {}}
        >
          <i className="fas fa-arrow-alt-circle-up" />
          &nbsp;
          <span>Kembali ke Atas</span>
        </BackToTop>
        <Alert />
        <FullScreenLoader />
        <ImageModal />

        {/* notification to verify email */}
        {!fullscreen &&
        this.props.session &&
        this.props.session.id &&
        !this.props.session.is_verified ? (
          <div style={StickyNoteStyle}>
            Kamu belum melakukan verifikasi email, segera cek email kamu. Atau
            klik{" "}
            <a
              onClick={() => this.props.dispatch(resendEmailValidationToken())}
              style={StickyNoteLinkStyle}
              href="javascript:;"
            >
              kirim ulang link verifikasi
            </a>
          </div>
        ) : null}
      </LayoutStyled>
    )
  }
}

const mapStateToProps = state => {
  return {
    session: state.User.session
  }
}

export default connect(mapStateToProps)(RootLayoutV5)
