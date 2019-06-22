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
    link: "https://twitter.com/intent/tweet?status=",
    icon: "https://img.icons8.com/color/48/000000/twitter.png",
    title: "Share ke Twitter"
  },
  {
    name: "Linkedin",
    link: "https://www.linkedin.com/shareArticle?mini=true&url=",
    icon: "https://img.icons8.com/color/48/000000/linkedin.png",
    title: "Share ke Linkedin"
  },
  {
    name: "Sebangsa",
    link: "https://sebangsa.com/post/create?text=",
    icon:
      "https://sebangsanetwork.com/wp-content/uploads/2018/08/logo-green.svg",
    title: "Share ke Sebangsa"
  }
]

class Share extends React.Component {
  clickHandler(key) {
    return window.open(
      `${SocMeds[key].link}${this.props.url || ""}`,
      SocMeds[key].title,
      "width=600,height=400"
    )
  }

  render() {
    return (
      <ShareStyled className="share-box">
        <h2>Bagikan ke:</h2>
        <div className="share-box_items">
          {SocMeds.map((n, key) => {
            return (
              <a
                key={key}
                className="share-box_items_link"
                onClick={() => this.clickHandler(key)}
                href="javascript:;"
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
}

export default Share
