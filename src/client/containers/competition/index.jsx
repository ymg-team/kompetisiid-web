import React, { Component } from "react"
import { epochToDMY, epochToRelativeTime } from "../../helpers/DateTime"
import Loadable from "react-loadable"
import { nominalToText } from "../../helpers/Number"
import { nl2br } from "../../helpers/String"
import { toCamelCase } from "string-manager"
import { connect } from "react-redux"
import memoize from "memoize-one"

// components
import Helmet from "../../components/Helmet"
import Loading from "../../components/preloaders/GlobalLoader"
import EmptyLoading from "../../components/preloaders/EmptyLoader"
import Tab, { tab } from "../../components/navigations/TabCompetition"
import Loader from "../../components/loaders/DefaultLoader"
import CompetitionDetailBox from "../../components/boxs/CompetitionDetail"
import CompetitionLoading from "../../components/preloaders/CompetitionCardLoader"
import NextPrev from "../../components/navigations/NextPrev"
import ErrorCard from "../../components/cards/ErrorCard"
import Host from "../../../config/host"
import MediaPartner from "../../components/cards/MediaPartner"
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

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      encid: this.props.match.params.encid
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    // add scroll listener
    addEventListener("scroll", this.handleScroll, true)
  }

  componentWillUnmount() {
    // remove event listener
    removeEventListener("scroll", this.handleScroll, true)
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
    const { detail, related, pengumuman } = this.props.kompetisi
    const { active_tab } = this.props.route
    let NextPrevProps = {},
      helmetdata = { script: [] }

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
      <div>
        <Helmet {...helmetdata} />
        {detail[encid] && detail[encid].status ? (
          detail[encid].status == 200 ? (
            <div className="competition-detail">
              {/* detail box competition */}
              <CompetitionDetailBox data={detail[encid].data} />

              <div className="m-20" />

              {/* competition tab navigation */}
              <Tab
                active={this.props.route.active_tab}
                data={detail[encid].data}
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
                          hanya berlaku sebagai media publikasi. Jika ada
                          pertanyaan lebih lanjut mengenai kompetisi ini
                          silahkan sampaikan langsung ke kontak yang tersedia
                          tab kontak.
                        </div>
                      ) : null}
                      {detail[encid].data.is_mediapartner &&
                      !detail[encid].data.is_support ? (
                        <div
                          style={{ marginTop: 0 }}
                          className="alert alert-blue"
                        >
                          <strong>Perhatian&nbsp;</strong>
                          Di kompetisi ini, <strong>Kompetisi ID </strong>
                          berlaku sebagai media partner, jika ada pertanyaan
                          lebih lanjut mengenai kompetisi ini, bisa ditanyakan
                          langsung ke penyelenggara atau melalui tab diskusi.
                        </div>
                      ) : null}
                      {detail[encid].data.is_support ? (
                        <div
                          style={{ marginTop: 0 }}
                          className="alert alert-blue"
                        >
                          <strong>Perhatian&nbsp;</strong>
                          Kompetisi ini bisa diikuti langsung di{" "}
                          <strong>Kompetisi ID</strong>, silahkan login dan klik
                          tombol 'ikuti kompetisi'.
                        </div>
                      ) : null}
                      {/*end of alert*/}
                      <div className="m-20" />

                      <div className="row">
                        <div
                          className={active_tab == 1 ? "col-md-8" : "col-md-12"}
                        >
                          {(() => {
                            switch (active_tab) {
                              case 1:
                                return (
                                  <Regulations
                                    encid={encid}
                                    nospace_title={
                                      detail[encid].data.nospace_title
                                    }
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
                        {active_tab == 1 ? (
                          <div className="col-md-4">
                            <div className="competition-detail--meta">
                              <progress value={30} max={100} />
                              <h3 className="total-prize">
                                <strong>
                                  {nominalToText(
                                    detail[encid].data.prize.total
                                  )}
                                </strong>
                                <small className="text-muted">
                                  total hadiah
                                </small>
                              </h3>
                              <h3 className="total-view">
                                {detail[encid].data.views}
                                <small className="text-muted">kunjungan</small>
                              </h3>
                              <h3 className="total-view">
                                {epochToRelativeTime(
                                  detail[encid].data.deadline_at
                                )}
                                <small className="text-muted">{`deadline (${epochToDMY(
                                  detail[encid].data.deadline_at * 1000
                                )})`}</small>
                              </h3>
                              <h3 className="total-view">
                                {epochToRelativeTime(
                                  detail[encid].data.announcement_at
                                )}
                                <small className="text-muted">{`pengumuman (${epochToDMY(
                                  detail[encid].data.announcement_at * 1000
                                )})`}</small>
                              </h3>
                            </div>
                            <hr />
                            <h4 className="text-muted">
                              Kompetisi ini bersifat
                            </h4>
                            {detail[encid].data.is_garansi ? (
                              <span
                                title="kompetisi sudah diverifikasi keberadaannya oleh kru KI"
                                className="label label-gray"
                              >
                                Garansi
                              </span>
                            ) : null}
                            {detail[encid].data.is_mediapartner ? (
                              <span
                                title="KI berlaku sebagai media partner di kompetisi ini"
                                className="label label-gray"
                              >
                                Media Partner
                              </span>
                            ) : null}
                            {detail[encid].data.is_support ? (
                              <span
                                title="kompetisi ini bisa diikuti melelui KI"
                                className="label label-gray"
                              >
                                Support
                              </span>
                            ) : null}
                            <br />
                            <br />

                            {/* media parner ads */}
                            <MediaPartner size="square" />

                            {/* GAds */}
                            <GAds
                              style={{ margin: 0 }}
                              adClient="ca-pub-4468477322781117"
                              adSlot={9209398500}
                              timeout={1000}
                            />
                            {/* end of GAds */}
                          </div>
                        ) : null}
                        {/* end of show sidebar info */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*next prev*/}
              <NextPrev {...NextPrevProps} />

              {/*related competitions*/}
              {related[`related_${encid}`] &&
              related[`related_${encid}`].status &&
              related[`related_${encid}`].status === 200 ? (
                <div className="col-md-12 bg-gray-soft">
                  <div className="m-20 row" />
                  <CompetitionBox
                    subtitle={false}
                    total={4}
                    // size="small"
                    {...related[`related_${encid}`]}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <ErrorCard {...detail[encid].meta} />
          )
        ) : (
          <div className="fullheight">
            <Loader />
          </div>
        )}
      </div>
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

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
