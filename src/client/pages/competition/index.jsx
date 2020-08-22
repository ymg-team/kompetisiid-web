import React, { useEffect } from "react"
import Loadable from "react-loadable"
import { nl2br } from "../../helpers/string"
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

const handleScroll = e => {
  if (typeof window !== "undefined") {
    // console.log('scrolling in competition detail...')
    const afterScroll =
      document.getElementById("competition-detail").offsetHeight + 40
    const tabEl = document.getElementById("container-competition-tab")
    // const joinEl = document.getElementById("btn-join")

    if (afterScroll) {
      if (window.pageYOffset > afterScroll) {
        tabEl.classList.add("fixed")
        // joinEl.style.opacity = 1
      } else {
        tabEl.classList.remove("fixed")
        // joinEl.style.opacity = 0
      }
    }
  }
}

const CompetitionDetail = props => {
  const { encid } = props.match.params
  const { detail, related } = props.kompetisi
  const { active_tab } = props.route

  const competitionDetail = detail[encid] || {}
  let NextPrevProps = {},
    helmetdata = {
      script: []
    }

  useEffect(() => {
    // componentDidMount
    if (typeof window !== "undefined") {
      addEventListener("scroll", handleScroll, true)
    }

    // called on componentWillUnmount
    return () => {
      removeEventListener("scroll", handleScroll, true)
    }
  })

  if (competitionDetail.status === 200) {
    helmetdata = Object.assign(helmetdata, {
      title: toCamelCase(
        `${tab[props.route.active_tab - 1].name + " " || ""}${
          competitionDetail.data.title
        }`
      ),
      description: competitionDetail.data.sort,
      image: competitionDetail.data.poster.original,
      url: `${Host[process.env.NODE_ENV].front}/competition/${
        competitionDetail.data.id
      }/regulations/${competitionDetail.data.nospace_title}`
    })

    // add jsonld
    helmetdata.script.push({
      type: "application/ld+json",
      innerHTML: generateJsonld(competitionDetail.data, helmetdata.url)
    })

    // nextprev props
    if (Object.keys(competitionDetail.next).length > 0) {
      NextPrevProps.next = {
        title: competitionDetail.next.title,
        link: `/competition/${competitionDetail.next.id}/regulations/${competitionDetail.next.nospace_title}`
      }
    }

    if (Object.keys(competitionDetail.prev).length > 0) {
      NextPrevProps.prev = {
        title: competitionDetail.prev.title,
        link: `/competition/${competitionDetail.prev.id}/regulations/${competitionDetail.prev.nospace_title}`
      }
    }
  }

  return (
    <React.Fragment>
      <Helmet {...helmetdata} />

      <div className="competition-detail">
        {/* detail box competition */}
        <CompetitionDetailBox
          dispatch={props.dispatch}
          data={competitionDetail.data}
          authData={props.authData}
        />

        {/* competition tab navigation */}
        <Tab
          active={props.route.active_tab}
          data={competitionDetail.data}
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
                {!competitionDetail.data.is_mediapartner &&
                !competitionDetail.data.is_support ? (
                  <div style={{ marginTop: 0 }} className="alert alert-warning">
                    <strong>Perhatian&nbsp;</strong>
                    Di kompetisi ini, <strong>Kompetisi ID </strong>
                    hanya berlaku sebagai media publikasi. Jika ada pertanyaan
                    lebih lanjut mengenai kompetisi ini silahkan sampaikan
                    langsung ke kontak yang tersedia tab kontak.
                  </div>
                ) : null}
                {competitionDetail.data.is_mediapartner &&
                !competitionDetail.data.is_support ? (
                  <div style={{ marginTop: 0 }} className="alert alert-blue">
                    <strong>Perhatian&nbsp;</strong>
                    Di kompetisi ini, <strong>Kompetisi ID </strong>
                    berlaku sebagai media partner, jika ada pertanyaan lebih
                    lanjut mengenai kompetisi ini, bisa ditanyakan langsung ke
                    penyelenggara atau melalui tab diskusi.
                  </div>
                ) : null}
                {competitionDetail.data.is_support ? (
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
                  <div className={"col-sm-8"}>
                    {(() => {
                      switch (active_tab) {
                        case 2:
                          return (
                            <Regulations
                              encid={encid}
                              nospace_title={
                                competitionDetail.data.nospace_title
                              }
                              link_source={competitionDetail.data.link_source}
                              tags={
                                competitionDetail.data.tag
                                  ? competitionDetail.data.tag.split(",")
                                  : []
                              }
                              html={competitionDetail.data.content}
                            />
                          )
                        case 1:
                          return (
                            <Prizes
                              html={nl2br(
                                competitionDetail.data.prize.description
                              )}
                            />
                          )
                        case 3:
                          return (
                            <Announcements
                              data={
                                competitionDetail.data.announcement
                                  ? competitionDetail.data.announcement
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
                                competitionDetail.data.contacts
                                  ? competitionDetail.data.contacts
                                  : []
                              }
                            />
                          )
                        case 6:
                          return (
                            <Share
                              title={competitionDetail.data.title}
                              desc={competitionDetail.data.sort}
                              link={helmetdata.url}
                            />
                          )
                        default:
                          return null
                      }
                    })()}
                  </div>

                  {/* show sidebar info */}
                  <Sidebar {...detail[encid]} />
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
          <React.Fragment>
            <div className="m-50 row" />
            <CompetitionBox
              subtitle={false}
              total={4}
              size="small"
              {...related[`related_${encid}`]}
            />
          </React.Fragment>
        ) : null}
        {/* end of related competition */}
      </div>
    </React.Fragment>
  )
}

function generateJsonld(n, url) {
  const now = new Date().getTime()
  const createdAt = new Date(n.created_at * 1000).toISOString()
  return `{
    "@context": "http://schema.org",
    "@type": "Event",
    "name": "${n.title.replace(/\"/g, "")}",
    "description": "${n.sort.replace(/\"/g, "")}",
    "startDate": "${createdAt}",
    "endDate": "${new Date(n.deadline_at * 1000).toISOString()}",
    "url": "${url}",
    "sameAs": "${n.link_source}",
    "eventAttendanceMode": "Online",
    "eventStatus": "${now > n.deadline_at * 1000 ? "Ongoing" : "End"}",
    "image": {
        "@type": "ImageObject",
        "url": "${n.poster.original}",
        "height": "500",
        "width": "500"
    },
    "organizer": {
      "@type": "Organization",
      "name": "${n.organizer}",
      "url": "${n.link_source}",
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
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR",
      "url": "${url}",
      "availability": "${n.link_source}",
      "validFrom": "${createdAt}"
    },
    "performers": "Warga Negara Indonesia"
  }`
}

function mapStateToProps(state) {
  const { Kompetisi, User } = state
  return {
    kompetisi: Kompetisi,
    authData: User.session || {}
  }
}

export default connect(mapStateToProps)(CompetitionDetail)
