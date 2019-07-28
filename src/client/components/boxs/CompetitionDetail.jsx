import React from "react"
import Loadable from "react-loadable"
import { eventFire } from "../../helpers/DomEvents"
import { getCompetitionStatus } from "../../helpers/DateTime"
import copy from "copy-to-clipboard"
import Styled from "styled-components"

// components
import Modal from "../modals/index"
import { Link } from "react-router-dom"
import BtnJoin from "../buttons/BtnJoin"
import { alert } from "../Alert"
import BtnLike from "../buttons/BtnLikeCompetition"

const StyledCalendar = Styled.div`
  a.calendar-item {
    width: calc(100% / 3);
  }

  /* responsive handler */
  @media only screen and (max-width: 543px) {
    a.calendar-item {
      width: 100%;
    }
  }
`

const CompetitionDetailStyled = Styled.div`
  .small-stats-icon {
    margin-right: 10px;
    cursor: default;
  }
`

const CompetitionDetailBox = props => {
  const { data } = props
  const link_competition = `https://kompetisi.id/competition/${
    data.id
  }/regulations/${data.nospace_title}`

  const { is_ended, is_waiting } = getCompetitionStatus(
    data.deadline_at,
    data.announcement_at
  )

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
                src="/assets/4.2/img/default-avatar.jpg"
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
                  href={`/browse/${data.main_category.name}/${data.sub_category.name}`}
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
                        target="_blank"
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
      <Modal id="save-to-calendar">
        <div className="container">
          <div className="modal-title">
            Simpan ke kalender
            <a
              className="btn btn-white btn-close-modal btn-sm fas fa-times"
              href="javascript:;"
            />
          </div>
          <hr />

          <StyledCalendar>
            {/* add to Google Calendar */}
            <a
              className="calendar-item"
              href={addCalendar.google(data)}
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
                src="/assets/4.2/img/google-calendar-icon.fullwidth.png"
              />
            </a>
            {/* end of add to Google Calendar */}

            {/* add to Yahoo Calendar */}
            <a
              className="calendar-item"
              href={addCalendar.yahoo(data)}
              target="_blank"
              title="Tambahkan ke Yahoo Calendar"
              rel="noopener"
            >
              <img
                style={{
                  width: "inherit",
                  backgroundColor: "#FFF",
                  maxWidth: "100%"
                }}
                src="/assets/4.2/img/yahoo-calendar-icon.fullwidth.png"
              />
            </a>
            {/* end of add to Yahoo Calendar */}

            {/* add to Miscrosoft Calendar */}
            <a
              className="calendar-item"
              onClick={() =>
                alert(
                  true,
                  "untuk sekarang, kalender Microsoft untuk saat ini belum tersedia",
                  "warning"
                )
              }
              href="javascript:;"
            >
              <img
                style={{
                  width: "inherit",
                  backgroundColor: "#FFF",
                  maxWidth: "100%"
                }}
                src="/assets/4.2/img/microsoft-calendar-icon.fullwidth.png"
              />
            </a>
            {/* end of add to Microsoft Calendar */}
          </StyledCalendar>
        </div>
      </Modal>
    </CompetitionDetailStyled>
  )
}

const addCalendar = {
  google: (n, url) => {
    const d = n.deadline_at.split(" ")
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=deadline ${
      n.title
    }&dates=${d[0].replace(/-/g, "")}T000000Z/${d[0].replace(
      /-/g,
      ""
    )}T240000Z&details=${n.sort +
      "\n" +
      n.prize.description}&location=http://kompetisi.id/competition/${
      n.id
    }/regulations/${n.nospace_title}&sf=true&output=xml#eventpage_6`
  },
  yahoo: (n, url) => {
    const d = n.deadline_at.split(" ")
    return `https://calendar.yahoo.com/?v=60&view=d&type=20&title=deadline ${
      n.title
    }&st=${d[0].replace(/-/g, "")}T000000Z&dur=0600&desc=${n.sort +
      "\n" +
      n.prize.description}&in_loc=http://kompetisi.id/competition/${
      n.id
    }/regulations/${n.nospace_title}`
  },
  microsoft: () => {}
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
