import React, { Component } from 'react'
import Styled from 'styled-components'
import MediaPartnerData from '../../../store/consts/media_partners'

const MediaPartnerStyled = Styled.div`
  padding: 1em 0;
  display: block;
  text-align: center;
  a {
    display: inline-block;
    img {
      max-width: 100%;
    }
    .mediapartner-text {
      color: #FFF;
      background: #2c2c2c;
      display: block;
      font-size: 10px;
      padding: .5px;
    }
  }
`

let adsInterval

export default class MediaPartner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: Math.floor(Math.random() * MediaPartnerData.length)
    }
  }

  static defaultProps = {
    size: 'landscape'
  }

  componentDidMount() {
    // generate random index
    adsInterval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * MediaPartnerData.length)
      console.log('update ads to index : ')
      this.setState({
        active: nextIndex
      })
    }, 10000)
  }

  componentWillUnmount()
  {
    clearInterval(adsInterval)
  }

  render() {
    if (MediaPartnerData.length > 0) {
      const data = MediaPartnerData[this.state.active]
      return (
        <MediaPartnerStyled>
          <a href={data.url} title={data.title} target="_blank">
            <img src={data.poster[this.props.size]} alt={data.title} />
            <span className="mediapartner-text">Kompetisi.id sebagai Media Partner</span>
          </a>
        </MediaPartnerStyled>
      )
    } else {
      return null
    }
  }
}
