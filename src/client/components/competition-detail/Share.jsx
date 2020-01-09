import React, { PureComponent } from "react"

export default class Share extends PureComponent {
  render() {
    const { title, desc, link } = this.props
    return (
      <div>
        <h2>Share kompetisi</h2>
        <p className="text-muted">
          Bagikan ke teman-temanmu untuk meramaikan kompetisi ini.
        </p>
        <hr />

        {/* click to share on Facebook */}
        <a
          href="#"
          className="share share-facebook"
          title="share ke Facebook"
          onClick={(e) => {
            e.preventDefault()
            window.open(
              `http://www.facebook.com/sharer/sharer.php?u=${link}&title=${title}&desc=${desc}`,
              "MsgWindow",
              "width=500,height=400"
            )
          }}
        >
          <div className="share__icon">
            <i className="fab fa-facebook" />
          </div>
          <div className="share__count">
            <strong>Facebook </strong>456787
          </div>
        </a>
        {/* end of click to share on Facebook */}

        {/* click to share on Twitter */}
        <a
          href="#"
          className="share share-twitter"
          title="share ke Twitter"
          onClick={(e) => {
            e.preventDefault()
            window.open(
              `http://twitter.com/intent/tweet?status=${title}+${link}`,
              "MsgWindow",
              "width=500,height=400"
            )
          }}
        >
          <div className="share__icon">
            <i className="fab fa-twitter-square" />
          </div>
          <div className="share__count">
            <strong>Twitter </strong>420879
          </div>
        </a>
        {/* end of click to share on Twitter */}

        {/* click to share on Linkedin */}
        <a
          href="#"
          className="share share-linkedin"
          title="share ke Linkedin"
          onClick={(e) => {
            e.preventDefault()
            window.open(
              `http://www.linkedin.com/shareArticle?mini=true&url=${link}&title=${title}`,
              "MsgWindow",
              "width=500,height=400"
            )
          }}
        >
          <div className="share__icon">
            <i className="fab fa-linkedin" />
          </div>
          <div className="share__count">
            <strong>Linkedin </strong>345
          </div>
        </a>
        {/* end of click to share on Linkedin */}

        {/*<a 
            href='javascript:;'
            className='share share-googleplus'
            title='share ke Google Plus'>
            <div className='share__icon'><i className='fa fa-google-plus' /></div>
            <div className='share__count'><strong>Google+ </strong>456787</div>
        </a>*/}

        {/* click to share on Sebangsa */}
        <a
          href="#"
          className="share share-sebangsa"
          title="share ke Sebangsa"
          onClick={(e) => {
            e.preventDefault()
            window.open(
              `https://sebangsa.com/post/create?text=${link} ${title}`,
              "MsgWindow",
              "width=500,height=400"
            )
          }}
        >
          <div className="share__icon">
            <img src="https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,w_30/v1533738457/kompetisi-id/email_assets/logo_sebangsa_white_transparent_square.png" />
          </div>
          <div className="share__count">
            <strong>Sebangsa </strong>12879
          </div>
        </a>
        {/* end of click to share on Sebangsa */}
      </div>
    )
  }
}
