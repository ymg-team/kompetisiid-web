import React, { useEffect, useState } from "react"
import Styled from "styled-components"
import MediaPartnerData from "../../../../store/consts/media_partners"

// components
import GAds from "../GoogleAds"

const MediaPartnerStyled = Styled.div`
  padding: 2em 0;
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

const MediaPartnerAds = props => {
  const [active, setActive] = useState(
    Math.floor(Math.random() * MediaPartnerData.length)
  )

  useEffect(() => {
    adsInterval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * MediaPartnerData.length)
      setActive(nextIndex)

      return () => {
        clearInterval(adsInterval)
      }
    }, 10000)
  }, [])

  if (MediaPartnerData.length > 0) {
    const data = MediaPartnerData[active]
    return (
      <MediaPartnerStyled>
        <a href={data.url} title={data.title} target="_blank">
          <img src={data.poster[props.size]} alt={data.title} />
          <span className="mediapartner-text">
            Kompetisi Id sebagai Media Partner
          </span>
        </a>
      </MediaPartnerStyled>
    )
  } else if (!props.noads) {
    return (
      <div className="align-center">
        <GAds
          adClient="ca-pub-4468477322781117"
          adSlot={1270681813}
          timeout={1000}
          style={{ marginBottom: 0 }}
        />
      </div>
    )
  } else {
    return null
  }
}

MediaPartnerAds.defaultProps = {
  size: "landscape"
}

export default MediaPartnerAds
