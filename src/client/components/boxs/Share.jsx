import React from "react"
import Styled from "styled-components"

const ShareStyled = Styled.div`
    margin-bottom: 20px;
    .share-box_items_link {
        margin-left: -5px;
        margin-right: 15px;
        img {
            width: 48px;
            height: 48px;
        }
    } 
`

const SocMeds = [
  {
    name: "Facebook",
    link: "https://www.facebook.com/sharer/sharer.php?u=",
    icon: "https://img.icons8.com/color/48/000000/facebook.png",
    title: "Share ke Facebook"
  },
  {
    name: "Twitter",
    link: "https://twitter.com/intent/tweet?text=",
    icon: "https://img.icons8.com/color/48/000000/twitter.png",
    title: "Share ke Twitter"
  },
  {
    name: "Linkedin",
    link: "https://www.linkedin.com/shareArticle?mini=true&url=",
    icon: "https://img.icons8.com/color/48/000000/linkedin.png",
    title: "Share ke Linkedin"
  }
]

const Share = props => {
  const clickHandler = key => {
    return window.open(
      `${SocMeds[key].link}${this.props.url || ""}`,
      SocMeds[key].title,
      "width=600,height=400"
    )
  }

  return (
    <ShareStyled className="share-box">
      <h2>Bagikan ke:</h2>
      <div className="share-box_items">
        {SocMeds.map((n, key) => {
          return (
            <a
              key={key}
              className="share-box_items_link"
              onClick={e => {
                e.preventDefault()
                clickHandler(key)
              }}
              href="#"
              title={n.title}
            >
              <img src={n.icon} alt={n.title} />
            </a>
          )
        })}
      </div>
    </ShareStyled>
  )
}

export default Share
