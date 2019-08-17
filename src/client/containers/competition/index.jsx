import React, { Component } from "react"
import Loadable from "react-loadable"
import { nl2br } from "../../helpers/String"
import { toCamelCase } from "string-manager"
import { connect } from "react-redux"

// components
import Helmet from "../../components/Helmet"
import Loading from "../../components/preloaders/GlobalLoader"
import Tab, { tab } from "../../components/navigations/TabCompetition"
import CompetitionDetailBox from "../../components/boxs/CompetitionDetail"
import CompetitionLoading from "../../components/preloaders/CompetitionCardLoader"
import NextPrev from "../../components/navigations/NextPrev"
import Host from "../../../config/host"
import GAds from "../../components/cards/GoogleAds"

const CompetitionBox = Loadable({
  loader: () => import("../../components/boxs/CompetitionBox"),
  loading: CompetitionLoading
})
const Contacts = Loadable({
  loader: () => import("../../components/competition-detail/Contacts"),
  loading: Loading
})
const Share = Loadable({
  loader: () => import("../../components/competition-detail/Share"),
  loading: Loading
})
const Announcements = Loadable({
  loader: () => import("../../components/competition-detail/Announcements"),
  loading: Loading
})
const Prizes = Loadable({
  loader: () => import("../../components/competition-detail/Prizes"),
  loading: Loading
})
const Regulations = Loadable({
  loader: () => import("../../components/competition-detail/Regulations"),
  loading: Loading
})
const Discussions = Loadable({
  loader: () => import("../../components/competition-detail/Discussions"),
  loading: Loading
})
const Sidebar = Loadable({
  loader: () => import("../../components/competition-detail/Sidebar"),
  loading: Loading
})

class Index extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    // add scroll listener
    addEventListener("scroll", this.handleScroll, true)

    // photoswipe initial aftwr several seconds
    setTimeout(() => {
      // this.photoSwipeInitial()
    }, 2000)
  }

  componentWillUnmount() {
    // remove event listener
    removeEventListener("scroll", this.handleScroll, true)
  }

  // function to initial photoSwipe
  photoSwipeInitial() {
    // get photoswipe element
    const pswpEl = document.querySelectorAll(".pswp")[0]
    // build items array
    const items = [
      {
        src: 'https://placekitten.com/600/400',
        w: 600,
        h: 400
      },
      {
          src: 'https://placekitten.com/1200/900',
          w: 1200,
          h: 900
      }
    ]
    // define options
    const options = {
      index: 0
    }

    var gallery = new PhotoSwipe(pswpEl, false, items, options)
    gallery.init()
  }

  handleScroll(e) {
    // console.log('scrolling in competition detail...')
    const afterScroll =
      document.getElementById("competition-detail").offsetHeight + 40
    const tabEl = document.getElementById("container-competition-tab")
    const joinEl = document.getElementById("btn-join")

    if (joinEl && afterScroll) {
      if (window.pageYOffset > afterScroll) {
        tabEl.classList.add("fixed")
        joinEl.style.opacity = 1
      } else {
        tabEl.classList.remove("fixed")
        joinEl.style.opacity = 0
      }
    }
  }

  render() {
    const { encid } = this.props.match.params
    const { detail, related } = this.props.kompetisi
    const { active_tab } = this.props.route
    let NextPrevProps = {},
      helmetdata = {
        script: [
          // {
          //   src: "/assets/photoswipe/photoswipe.min.js",
          //   type: "text/javascript"
          // },
          // {
          //   src: "/assets/photoswipe/photoswipe-ui-default.min.js",
          //   type: "text/javascript"
          // }
        ],
        link: [
          // {
          //   href: "/assets/photoswipe/photoswipe.css",
          //   rel: "stylesheet",
          //   type: "text/css"
          // }
        ]
      }

    // generate helmet data
    if (detail[encid] && detail[encid].status && detail[encid].status === 200) {
      helmetdata = Object.assign(helmetdata, {
        title: toCamelCase(
          `${tab[this.props.route.active_tab - 1].name + " " || ""}${
            detail[encid].data.title
          }`
        ),
        description: detail[encid].data.sort,
        image: detail[encid].data.poster.original,
        url: `${Host[process.env.NODE_ENV].front}/competition/${
          detail[encid].data.id
        }/regulations/${detail[encid].data.nospace_title}`
      })

      // add jsonld
      helmetdata.script.push({
        type: "application/ld+json",
        innerHTML: generateJsonld(detail[encid].data, helmetdata.url)
      })

      // nextprev props
      if (Object.keys(detail[encid].next).length > 0) {
        NextPrevProps.next = {
          title: detail[encid].next.title,
          link: `/competition/${detail[encid].next.id}/regulations/${
            detail[encid].next.nospace_title
          }`
        }
      }

      if (Object.keys(detail[encid].prev).length > 0) {
        NextPrevProps.prev = {
          title: detail[encid].prev.title,
          link: `/competition/${detail[encid].prev.id}/regulations/${
            detail[encid].prev.nospace_title
          }`
        }
      }
    }

    return (
      <React.Fragment>
        <Helmet {...helmetdata} />
        <div className="competition-detail">
          {/* detail box competition */}
          <CompetitionDetailBox data={detail[encid].data} />

          <div className="m-20" />

          {/* competition tab navigation */}
          <Tab
            active={this.props.route.active_tab}
            data={detail[encid].data}
            link={helmetdata.url}
          />

          {/* GAds */}
          <div className="row">
            <div className="col-md-12 align-center">
              <GAds
                style={{ marginBottom: 0 }}
                adClient="ca-pub-4468477322781117"
                adSlot={9209398500}
                timeout={1000}
              />
            </div>
          </div>
          {/* end of GAds */}

          <div className="row">
            <div className="container">
              <div className="row competition-detail--content">
                <div className="col-md-10 col-md-push-1">
                  {/*alert*/}
                  {!detail[encid].data.is_mediapartner &&
                  !detail[encid].data.is_support ? (
                    <div
                      style={{ marginTop: 0 }}
                      className="alert alert-warning"
                    >
                      <strong>Perhatian&nbsp;</strong>
                      Di kompetisi ini, <strong>Kompetisi ID </strong>
                      hanya berlaku sebagai media publikasi. Jika ada pertanyaan
                      lebih lanjut mengenai kompetisi ini silahkan sampaikan
                      langsung ke kontak yang tersedia tab kontak.
                    </div>
                  ) : null}
                  {detail[encid].data.is_mediapartner &&
                  !detail[encid].data.is_support ? (
                    <div style={{ marginTop: 0 }} className="alert alert-blue">
                      <strong>Perhatian&nbsp;</strong>
                      Di kompetisi ini, <strong>Kompetisi ID </strong>
                      berlaku sebagai media partner, jika ada pertanyaan lebih
                      lanjut mengenai kompetisi ini, bisa ditanyakan langsung ke
                      penyelenggara atau melalui tab diskusi.
                    </div>
                  ) : null}
                  {detail[encid].data.is_support ? (
                    <div style={{ marginTop: 0 }} className="alert alert-blue">
                      <strong>Perhatian&nbsp;</strong>
                      Kompetisi ini bisa diikuti langsung di{" "}
                      <strong>Kompetisi ID</strong>, silahkan login dan klik
                      tombol 'ikuti kompetisi'.
                    </div>
                  ) : null}
                  {/*end of alert*/}
                  <div className="m-20" />

                  <div className="row">
                    <div className={active_tab == 1 ? "col-md-8" : "col-md-12"}>
                      {(() => {
                        switch (active_tab) {
                          case 1:
                            return (
                              <Regulations
                                encid={encid}
                                nospace_title={detail[encid].data.nospace_title}
                                link_source={detail[encid].data.link_source}
                                tags={
                                  detail[encid].data.tag
                                    ? detail[encid].data.tag.split(",")
                                    : []
                                }
                                html={detail[encid].data.content}
                              />
                            )
                          case 2:
                            return (
                              <Prizes
                                html={nl2br(
                                  detail[encid].data.prize.description
                                )}
                              />
                            )
                          case 3:
                            return (
                              <Announcements
                                data={
                                  detail[encid].data.announcement
                                    ? detail[encid].data.announcement
                                    : []
                                }
                              />
                            )
                          case 4:
                            return <Discussions link={helmetdata.url} />
                          case 5:
                            return (
                              <Contacts
                                data={
                                  detail[encid].data.contacts
                                    ? detail[encid].data.contacts
                                    : []
                                }
                              />
                            )
                          case 6:
                            return (
                              <Share
                                title={detail[encid].data.title}
                                desc={detail[encid].data.sort}
                                link={helmetdata.url}
                              />
                            )
                          default:
                            return null
                        }
                      })()}
                    </div>

                    {/* show sidebar info */}
                    {active_tab == 1 ? <Sidebar {...detail[encid]} /> : null}
                    {/* end of show sidebar info */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*next prev*/}
          <NextPrev {...NextPrevProps} />
          {/* end of next prev */}

          {/*related competitions*/}
          {related[`related_${encid}`] &&
          related[`related_${encid}`].status &&
          related[`related_${encid}`].status === 200 ? (
            <div className="col-md-12 bg-gray-soft">
              <div className="m-15 row" />
              <CompetitionBox
                subtitle={false}
                total={4}
                // size="small"
                {...related[`related_${encid}`]}
              />
            </div>
          ) : null}
          {/* end of related competition */}

          {/* photoswipe */}
          {/* Root element of PhotoSwipe. Must have class pswp. */}
          <div className="pswp" tabIndex={-1} role="dialog" aria-hidden="true">
            {/* Background of PhotoSwipe. 
   It's a separate element as animating opacity is faster than rgba(). */}
            <div className="pswp__bg" />
            {/* Slides wrapper with overflow:hidden. */}
            <div className="pswp__scroll-wrap">
              {/* Container that holds slides. 
      PhotoSwipe keeps only 3 of them in the DOM to save memory.
      Don't modify these 3 pswp__item elements, data is added later on. */}
              <div className="pswp__container">
                <div className="pswp__item" />
                <div className="pswp__item" />
                <div className="pswp__item" />
              </div>
              {/* Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. */}
              <div className="pswp__ui pswp__ui--hidden">
                <div className="pswp__top-bar">
                  {/*  Controls are self-explanatory. Order can be changed. */}
                  <div className="pswp__counter" />
                  <button
                    className="pswp__button pswp__button--close"
                    title="Close (Esc)"
                  />
                  <button
                    className="pswp__button pswp__button--share"
                    title="Share"
                  />
                  <button
                    className="pswp__button pswp__button--fs"
                    title="Toggle fullscreen"
                  />
                  <button
                    className="pswp__button pswp__button--zoom"
                    title="Zoom in/out"
                  />
                  {/* Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR */}
                  {/* element will get class pswp__preloader--active when preloader is running */}
                  <div className="pswp__preloader">
                    <div className="pswp__preloader__icn">
                      <div className="pswp__preloader__cut">
                        <div className="pswp__preloader__donut" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                  <div className="pswp__share-tooltip" />
                </div>
                <button
                  className="pswp__button pswp__button--arrow--left"
                  title="Previous (arrow left)"
                />
                <button
                  className="pswp__button pswp__button--arrow--right"
                  title="Next (arrow right)"
                />
                <div className="pswp__caption">
                  <div className="pswp__caption__center" />
                </div>
              </div>
            </div>
          </div>
          {/* end of photoswipe */}
        </div>
      </React.Fragment>
    )
  }
}

function generateJsonld(n, url) {
  return `{
    "@context": "http://schema.org",
    "@type": "Event",
    "name": "${n.title.replace(/\"/g, "")}",
    "description": "${n.sort.replace(/\"/g, "")}",
    "startDate": "${new Date(n.created_at * 1000).toISOString()}",
    "endDate": "${new Date(n.deadline_at * 1000).toISOString()}",
    "url": "${url}",
    "sameAs": "${n.link_source}",
    "image": {
        "@type": "ImageObject",
        "url": "${n.poster.original}",
        "height": "500",
        "width": "500"
    },
    "organizer": {
      "@type": "Organization",
      "name": "${n.organizer}",
      "logo": {
          "@type": "ImageObject",
          "url": "https://res.cloudinary.com/dhjkktmal/image/upload/v1528851826/kompetisi-id/email_assets/icon-512x512.png",
          "height": "500",
          "width": "500"
      }
    },
    "location": {
      "@type": "Place",
      "name": "Indonesia",
      "address": "Indonesia"
    },
    "offers": "Menangkan ${n.prize.description}",
    "performers": "Warga Negara Indonesia"
  }`
}

function mapStateToProps(state) {
  const { Kompetisi } = state
  return {
    kompetisi: Kompetisi
  }
}

export default connect(mapStateToProps)(Index)
