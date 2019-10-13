import React from "react"
import { eventFire } from "../../helpers/DomEvents"
import { getCompetitionStatus } from "../../helpers/DateTime"
import copy from "copy-to-clipboard"
import Styled from "styled-components"
import { objToQuery } from "string-manager"

// components
import Modal from "../modals/index"
import { Link } from "react-router-dom"
import BtnJoin from "../buttons/BtnJoin"
import { alert } from "../Alert"
import BtnLike from "../buttons/BtnLikeCompetition"

const StyledCalendar = Styled.div`
  a.calendar-item {
    &:first-child {
      border-top: 1px solid #F4F4F4;
    }
    display: block;
    border-bottom: 1px solid #F4F4F4;
    padding: .5em 1.2em;
    img {
      width: 35px !important;
      margin-right: 10px !important;
    }
    text-decoration: none;
    .fas.fa-angle-right {
      float: right;
      font-size: 25px;
      margin-top: 4px;
    }
  }

  /* responsive handler */
  @media only screen and (max-width: 543px) {
    
  }
`

const CompetitionDetailStyled = Styled.div`
  .small-stats-icon {
    margin-right: 10px;
    cursor: default;
  }
  .modal-white {
    .modal-white-content {
      padding: 0;
      .modal-title {
        padding: 1em;
        .btn-close-modal {
          top: 50%;
          right: .5em;
          margin-top: -17.5px;
        }
      }
    }
  }
`

const CompetitionDetailBox = props => {
  const { data } = props
  const link_competition = `https://kompetisi.id/c/${data.id}`

  const { is_ended, is_waiting } = getCompetitionStatus(
    data.deadline_at,
    data.announcement_at
  )

  // paremeter to generate query on add to calendar menus
  const calendarParams = calendarParamsGenerator(data)

  return (
    <CompetitionDetailStyled id="competition-detail" className="row">
      <div className="row">
        <div className="container">
          <div className="row m-20" />

          <div className="competition-author">
            <Link
              to={`/user/${data.author.username}`}
              title={`ke profil ${data.author.username}`}
            >
              <img
                style={{ float: "left", marginRight: "10px" }}
                src={
                  data.author.avatar.small ||
                  "/assets/4.2/img/avatar-default.jpg"
                }
              />
            </Link>
            <p>
              dipasang oleh{" "}
              <Link className="text-muted" to={`/user/${data.author.username}`}>
                {data.author.username}
              </Link>
              <br />
              <small className="text-muted">
                {data.created_in} di{" "}
                <a
                  className="text-muted"
                  href={`/browse/${data.main_category.name}`}
                >
                  <strong>{data.main_category.name}</strong>
                </a>
                ,
                <a
                  className="text-muted"
                  href={`/browse/${data.main_category.name}/${
                    data.sub_category.name
                  }`}
                >
                  <strong>{data.sub_category.name}</strong>
                </a>
              </small>
            </p>
          </div>

          <div className="row m-20" />

          <div className="row competition-detail--meta">
            <div className="col-md-6 align-center poster">
              <img
                data-mediabox="my-gallery-name"
                data-title="Sample image"
                alt={data.title}
                className="poster image-modal-target"
                src={data.poster.original}
              />
            </div>
            <div className="col-md-6 count">
              <div className="only-mobile m-30" />
              {/* competition status */}
              <div style={{ marginBottom: "20px" }}>
                {is_ended ? (
                  <span className="label label-red label-lg">
                    <i className="fa fa-check" /> Kompetisi telah berakhir
                  </span>
                ) : null}

                {is_waiting ? (
                  <span
                    title={`Pengumuan pemenang dalam ${data.sisapengumuman}`}
                    className="label label-orange label-lg"
                  >
                    <i className="fa fa-flag" /> Kompetisi sedang berlangsung
                  </span>
                ) : null}
              </div>

              <div className="competition-detail--title">
                <h1>{data.title}</h1>

                <div className="m-20" />

                <p className="text-muted">
                  <span
                    className="small-stats-icon"
                    title="Penyelenggara kompetisi"
                  >
                    <i className="far fa-building" /> {data.organizer}
                  </span>{" "}
                  <span className="small-stats-icon" title="Total views">
                    <i className="far fa-eye" /> {data.stats.views || 0}
                  </span>
                </p>
                <div className="m-20" />
                <p className="text-muted">{data.sort}</p>
              </div>
              <div className="m-30" />

              {/* button to join competition */}
              <BtnJoin data={data} />
              {/* end of button to join competition */}

              {/* like button */}
              <BtnLike
                competition_id={data.id}
                isLike={data.is_liked}
                total={data.stats.likes || 0}
              />
              {/* end of like button */}

              {/* more menus */}
              <div className="dropdown">
                <a
                  className="fa fa-ellipsis-h dropdown-button btn"
                  data-target="action-competition"
                  style={{ fontSize: 25, padding: "5px 10px" }}
                />
                <div className="dropdown-items" id="action-competition">
                  <ul>
                    <li>
                      <a
                        onClick={() =>
                          alert(
                            true,
                            "Sistem dalam tahap pengembangan",
                            "warning"
                          )
                        }
                        href="javascript:;"
                        title="simpan ke akun"
                      >
                        Simpan Kompetisi
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          modal("open", "save-to-calendar")
                        }}
                        href="javascript:;"
                        title="simpan ke kalender"
                      >
                        Tambahkan ke Kalender
                      </a>
                    </li>
                    <li>
                      <a
                        className="scopy-button"
                        onClick={() => handleCopyLink(link_competition)}
                        href="javascript:;"
                      >
                        Salin Link Kompetisi
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href={`https://docs.google.com/forms/d/e/1FAIpQLSdmsHkJdGctVkWYFhhLC10YYVbtNIi5IF8X0mbdd2DjS-N1eQ/viewform?entry.559533126=${link_competition}`}
                      >
                        Laporkan Kompetisi
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* end of more menus */}
            </div>
          </div>
        </div>
      </div>

      {/* modal save to calendar */}
      <Modal className="modal-white" id="save-to-calendar">
        <div className="col-md-6 col-xs-12 modal-white-content">
          <div className="modal-title">
            Simpan ke kalender
            <a
              className="btn btn-white btn-close-modal btn-sm fas fa-times"
              href="javascript:;"
            />
          </div>

          <StyledCalendar>
            {/* add to Google Calendar */}
            <a
              className="calendar-item"
              href={addCalendar.google(calendarParams)}
              target="_blank"
              title="Tambahkan ke Google Calendar"
              rel="noopener"
            >
              <img
                style={{
                  width: "inherit",
                  backgroundColor: "#FFF",
                  maxWidth: "100%"
                }}
                src="/assets/4.2/img/icon-google-calendar.png"
              />
              <span>Google Calendar</span>
              <span className="fas fa-angle-right" />
            </a>
            {/* end of add to Google Calendar */}

            {/* add to Yahoo Calendar */}
            <a
              className="calendar-item"
              href={addCalendar.yahoo(calendarParams)}
              target="_blank"
              title="Tambahkan ke Yahoo! Calendar"
              rel="noopener"
            >
              <img
                style={{
                  width: "inherit",
                  backgroundColor: "#FFF",
                  maxWidth: "100%"
                }}
                src="/assets/4.2/img/icon-yahoo-calendar.png"
              />
              <span>Yahoo! Calendar</span>
              <span className="fas fa-angle-right" />
            </a>

            {/* download to Outlook Calendar */}
            <a
              className="calendar-item"
              href={`data:text/plain;charset=utf-8,'${encodeURIComponent(
                addCalendar.apple(calendarParams)
              )}`}
              download="kompetisiid-event.ics"
              title="Tambahkan ke Outlook Calendar"
            >
              <img
                style={{
                  width: "inherit",
                  backgroundColor: "#FFF",
                  maxWidth: "100%"
                }}
                src="/assets/4.2/img/icon-outlook-calendar.png"
              />
              <span>Outlook Calendar</span>
              <span className="fas fa-angle-right" />
            </a>

            {/* download to Apple Calendar */}
            <a
              className="calendar-item"
              href={`data:text/calendar;charset=utf-8,${encodeURIComponent(
                addCalendar.apple(calendarParams)
              )}`}
              download="kompetisiid-event.ics"
              title="Tambahkan ke Apple Calendar"
            >
              <img
                style={{
                  width: "inherit",
                  backgroundColor: "#FFF",
                  maxWidth: "100%"
                }}
                src="/assets/4.2/img/icon-apple-calendar.png"
              />
              <span>Apple Calendar</span>
              <span className="fas fa-angle-right" />
            </a>
          </StyledCalendar>
        </div>
      </Modal>
    </CompetitionDetailStyled>
  )
}

const calendarParamsGenerator = n => {
  let deadlineISOString = new Date(n.deadline_at * 1000).toISOString()
  deadlineISOString = deadlineISOString
    .replace(/-/g, "")
    .replace(/:/g, "")
    .replace(/\.000/g, "")

  const params = {
    deadlineTitle: `Deadline ${n.title} - Kompetisi Id`,
    details: `Untuk selengkapnya silahkan kunjungi https://kompetisi.id/c/${
      n.id
    }`,
    deadlineDate: deadlineISOString,
    location: `https://kompetisi.id/c/${n.id}`
  }

  return params
}

const addCalendar = {
  // ref: http://taskboy.com/blog/Creating_events_for_Yahoo_and_Google_calendars.html
  google: n => {
    const query = {
      text: n.deadlineTitle,
      dates: `${n.deadlineDate}/${n.deadlineDate}`,
      // dates: `20190906T063000Z/20190906T090000Z`,
      details: n.details,
      location: n.location,
      sf: true
    }

    return `https://calendar.google.com/calendar/r/eventedit?${objToQuery(
      query
    )}`
  },
  yahoo: n => {
    const query = {
      v: 60,
      view: "d",
      type: 20,
      title: n.deadlineTitle,
      st: n.deadlineDate,
      dur: "0000",
      desc: n.details,
      in_loc: n.location
    }

    return `https://calendar.yahoo.com/?${objToQuery(query)}`
  },
  // apple calendar
  apple: n => {
    return (
      "BEGIN:VCALENDAR\n" +
      "VERSION:2.0\n" +
      "BEGIN:VEVENT\n" +
      "URL:" +
      n.location +
      "\n" +
      "DTSTART:" +
      n.deadlineDate +
      "\n" +
      "DTEND:" +
      n.deadlineDate +
      "\n" +
      "SUMMARY:" +
      n.title +
      "\n" +
      "DESCRIPTION:" +
      n.details +
      "\n" +
      "LOCATION:Kompetisi Id\n" +
      "END:VEVENT\n" +
      "END:VCALENDAR"
    )
  }
}

// function to handle copy link
function handleCopyLink(link) {
  // trigger to click body
  eventFire(document.getElementsByTagName("body")[0], "click")
  // copy
  copy(link)
  // alert if link has copied
  alert(true, "Link telah berhasil di copy.", "success")
}

export default CompetitionDetailBox
