import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

// components
const Ads = styled.ins`
  display: block;
  margin: 30px 0;
  text-align: center;
`

class GoogleAds extends Component {
  static propTypes = {
    adClient: PropTypes.string.isRequired,
    adSlot: PropTypes.number.isRequired,
    adTest: PropTypes.bool.isRequired,
    dummy: PropTypes.bool.isRequired,
    style: PropTypes.object,
    timeout: PropTypes.number
  }

  static defaultProps = {
    adTest: false,
    dummy: false,
    adSlot: 0,
    adClient: "",
    style: {}
  }

  componentDidMount() {
    // render new Google Ads
    if (process.env.NODE_ENV === "production") {
      if (this.props.timeout) {
        setTimeout(() => {
          ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        }, this.props.timeout)
      } else {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    }
  }

  componentWillUnmount() {
    // destroy Google Ads
  }

  render() {
    let style = { display: "block" }
    if (this.props.dummy) {
      style.backgroundColor = "#F4F4F4"
      style.height = "100px"
    }
    style = Object.assign(style, this.props.style)

    if (this.props.dummy) {
      return <Ads className="col-md-12" style={style} />
    } else {
      return (
        <Ads
          className="adsbygoogle"
          style={style}
          data-ad-client={this.props.adClient}
          data-ad-slot={this.props.adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
          data-adtest={this.props.adTest ? "on" : "off"}
        />
      )
    }
  }
}

export default GoogleAds
