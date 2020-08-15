import React, { useEffect, useRef } from "react"
import * as BeritaActions from "./actions"
import Host from "../../../config/host"
import Loadable from "react-loadable"
import Styled from "styled-components"
import { pushScript } from "../../helpers/domEvents"
import { connect } from "react-redux"
import { topLoading } from "../../components/preloaders"
import { epochToRelativeTime } from "../../helpers/dateTime"
import { textParser } from "../../helpers/string"

// components
import { Link } from "react-router-dom"
import Loading from "../../components/preloaders/GlobalLoader"
import Helmet from "../../components/Helmet"
import Author from "../../components/cards/NewsAuthorCard"
import ErrorCard from "../../components/cards/ErrorCard"
import Preloader from "../../components/preloaders/NewsDetail"
import GAds from "../../components/cards/GoogleAds"
import Share from "../../components/boxs/Share"

const NewsBox = Loadable({
  loader: () => import("../../components/boxs/NewsBox"),
  loading: Loading
})

const NewsDetailStyled = Styled.div`
.news-detail {
  .image {
    padding: 0 15px;
  }
  .author {
    margin: 60px 0 30px;
    a {
      text-decoration: none;
    }
    .avatar {
      width: 45px;
      float: left;
      margin: 0 10px 0 0;
    }
    .text-muted {
      display: flex;
    }
  }

  .image {
    text-align: center;
    margin: 20px auto;
    img {
      max-width: 100%;
      border-radius: 40px;
    }
  }

  .meta {
    letter-spacing: 0;
    .meta--item {
      margin-right: 20px;
    }
  }

  .content {
    letter-spacing: 0.8px;
    font-size: 1.1em;
    line-height: 1.7;
    iframe {
      display: block; 
      margin: 40px auto;
      width: 100%;
    }
    h1 {
      font-size: 3em;
      line-height: 1.2;
    }
    h2, h3, h4 {
      margin: 60px 0 20px;
    }
    p, ul > li, a {
      font-size: 1em;
    }
    img {
      text-align: center;
      margin: 40px auto;
      max-width: 100%;
      display: block;
    }
  }
}

.news-other {
  padding: 30px 0;
}
`

const generateTags = (tags = []) => {
  tags = tags.split(",")
  if (tags && tags.length > 0) {
    return tags.map((n, key) => {
      return (
        <span key={key}>
          <Link className="btn btn-white" to={`/news/tag/${n}`}>
            {n}
          </Link>{" "}
        </span>
      )
    })
  }

  return null
}

const NewsDetail = props => {
  const url = `${Host[process.env.NODE_ENV].front}/news/${
    props.match.params.encid
  }/${props.match.params.title}`

  const { encid, title } = props.match.params
  const { detail } = props.berita

  const firstRender = useRef(true)

  // function to reset disquss box after change url
  const resetDisquss = props => {
    const url = `${Host[process.env.NODE_ENV].front}/news/${
      props.match.params.encid
    }/${props.match.params.title}`

    setTimeout(() => {
      // disquss reset after 1000ms
      if (window.DISQUS)
        DISQUS.reset({
          reload: true,
          config: function() {
            this.page.identifier = url
            this.page.url = url
          }
        })

      // reset disqus count
      if (window.DISQUSWIDGETS) DISQUSWIDGETS.getCount({ reset: true })
    }, 1000)
  }

  // function to fetch new data
  const reqData = props => {
    const { encid } = props.match.params
    const data = props.berita.detail[encid] || {}
    if (!data.status) {
      topLoading(true)
      props.dispatch(BeritaActions.fetchBeritaDetail(encid))
    }
  }

  // watch route changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo(0, 0)
    resetDisquss(props)
    reqData(props)
  }, [props.match.params.encid])

  // called on componentDidMount and componentWillUnmount
  useEffect(() => {
    // componentDidMount
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0)
      pushScript("https://kompetisiindonesia.disqus.com/embed.js")
      pushScript("https://kompetisiindonesia.disqus.com/count.js", {
        id: "dsq-count-scr"
      })

      // fetch data from api
      reqData(props)

      // get all image inside .competition-regulator
      setTimeout(() => {
        const ImgEl = document.querySelectorAll(".news-detail .content img")
        // ref: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
        for (let n of ImgEl) {
          n.className = "image-modal-target"
        }
      }, 1000)
    }

    // componentWillUnmount
    return () => {}
  }, [])

  // helmet data generator
  let helmetdata = {
    title: "Kabar Kompetisi",
    description: "Kabar terbaru seputar kompetisi dari Kompetisi Id",
    url: `${Host[process.env.NODE_ENV].front}/news/${encid}/${title}`,
    script: []
  }

  if (detail[encid] && detail[encid].status && detail[encid].status === 200) {
    helmetdata = Object.assign(helmetdata, {
      title: detail[encid].data.title,
      description: detail[encid].data.contenttext,
      url: `https://kompetisi.id/news/${detail[encid].data.id}/${detail[encid].data.nospace_title}`,
      image: detail[encid].data.image.original
    })

    //add jsonld
    helmetdata.script.push({
      type: "application/ld+json",
      innerHTML: generateJsonld(detail[encid].data, helmetdata.url)
    })
  }
  // end of helmet data generator

  return (
    <NewsDetailStyled>
      <Helmet {...helmetdata} />

      {detail[encid] && detail[encid].status ? (
        parseInt(detail[encid].status) === 200 ? (
          <React.Fragment>
            <div className="col-md-6 col-md-push-3 col-md-pull-3">
              <div className="row">
                {/* start news detail wrapper */}
                <div className="news-detail">
                  <Author data={detail[encid].data.author} />
                  <article className="content">
                    <h1>{detail[encid].data.title}</h1>
                    <p className="meta text-muted">
                      <span className="meta--item">
                        <i className="fa fa-calendar-o" />{" "}
                        {epochToRelativeTime(detail[encid].data.created_at)}
                      </span>
                      <span className="meta--item">
                        <a
                          href="#"
                          title="komentar"
                          onClick={e => {
                            e.preventDefault()
                            document
                              .getElementById("disqus_thread")
                              .scrollIntoView({ behavior: "smooth" })
                          }}
                        >
                          <i className="far fa-comment" />{" "}
                          <span
                            className="disqus-comment-count"
                            data-disqus-url={url}
                          >
                            0
                          </span>
                        </a>
                      </span>
                    </p>
                  </article>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <React.Fragment>
                <div className="row">
                  <div className="news-detail">
                    <div className="image">
                      <figure>
                        <img
                          src={detail[encid].data.image.original}
                          className="image-modal-target"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
                {/* Google Ads */}
                <div className="col-md-12 align-center">
                  <GAds
                    style={{ marginTop: 0 }}
                    adClient="ca-pub-4468477322781117"
                    adSlot={1270681813}
                    timeout={1000}
                  />
                </div>
                {/* end of Google Ads */}
              </React.Fragment>
            </div>

            <div className="col-md-6 col-md-push-3 col-md-pull-3">
              <div className="row">
                <div className="news-detail">
                  <article
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: textParser(detail[encid].data.content)
                    }}
                  />
                  <div style={{ margin: "50px 0 0" }}>
                    {generateTags(detail[encid].data.tag)}
                  </div>
                </div>

                <br />

                {/* share button */}
                <Share url={url} />
                {/* end of share button */}

                <br />
              </div>
            </div>

            {/* related news */}
            <div className="col-md-12">
              <NewsBox
                subtitle={false}
                data={detail[encid].related}
                status={detail[encid].status}
                size="small"
              />
            </div>
            {/* end of related news */}
          </React.Fragment>
        ) : (
          <ErrorCard
            code={detail[encid].status}
            message={detail[encid].message}
          />
        )
      ) : (
        <div className="fullheight">
          <Preloader />
        </div>
      )}
      {detail[encid] && detail[encid].status && detail[encid].is_loading ? (
        <Preloader />
      ) : null}
      {/* comment section */}
      <div
        style={{
          display:
            detail[encid] && detail[encid].status && detail[encid].status == 200
              ? "block"
              : "none"
        }}
        className="col-md-6 col-md-push-3 col-md-pull-3"
      >
        <div
          style={{ padding: "50px 0" }}
          className="row comments"
          id="disqus_thread"
        />
      </div>
      {/* end of comment section */}
    </NewsDetailStyled>
  )
}

NewsDetail.fetchData = ({ params, store }) => {
  return store.dispatch(BeritaActions.fetchBeritaDetail(params.encid))
}

function generateJsonld(n, url) {
  return `{
        "@context": "https://schema.org",
        "@type": "Article",
        "publisher": {
            "@type": "Organization",
            "name": "Id+More",
            "logo": {
                "@type": "ImageObject",
                "url": "https://res.cloudinary.com/dhjkktmal/image/upload/v1528851826/kompetisi-id/email_assets/icon-512x512.png",
                "height": "500",
                "width": "500"
            }
        },
        "author": {
            "@type": "Person",
            "name": "${n.author.username}",
            "image": "https://kompetisi.id/assets/4.2/img/avatar-default.jpg",
            "url": "https://kompetisi.id/user/${n.author.username}",
            "sameAs": [
                ""
            ],
            "description": "${n.author.moto}"
        },
        "headline": "${n.title}",
        "url": "${url}",
        "datePublished": "${new Date(n.created_at * 1000).toISOString()}",
        "dateModified": "${new Date(n.updated_at * 1000).toISOString()}",
        "image": {
            "@type": "ImageObject",
            "url": "${n.image.original}",
            "height": "500",
            "width": "500"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${url}"
        },
        "keywords": "${n.tag}",
        "description": "${n.content}"
    }`
}

function mapStateToProps(state) {
  const { Berita } = state
  return {
    berita: Berita
  }
}

module.exports = connect(mapStateToProps)(NewsDetail)
