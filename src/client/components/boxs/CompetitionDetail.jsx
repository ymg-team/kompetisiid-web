import React from "react"
import { eventFire } from "../../helpers/domEvents"
import { getCompetitionStatus } from "../../helpers/dateTime"
import copy from "copy-to-clipboard"
import Styled from "styled-components"

// components
import AddToCalendarModal from "../modals/AddToCalendar"
import { Link } from "react-router-dom"
import BtnJoin from "../buttons/BtnJoin"
import { alert } from "../Alert"
import BtnLike from "../buttons/BtnLikeCompetition"

// actions
import { subscribeCompetition } from "../../pages/competition/actions"

const CompetitionDetailStyled = Styled.div`
  .small-stats-icon {
    margin-right: 10px;
    cursor: default;
  }
`

const CompetitionDetailBox = props => {
  const { data } = props
  const link_competition = `https://kompetisi.id/c/${data.id}`

  const { is_ended, is_waiting } = getCompetitionStatus(
    data.deadline_at,
    data.announcement_at
  )

  const _subscribeHandler = () => {
    const permission = Notification.permission
    
    if (!("Notification" in window)) {
      return alert(true, "Browser kamu tidak support untuk notifikasi, silahkan update atau ganti browser lain", "error")
    }

    if(permission === "granted") {
      return props.dispatch(subscribeCompetition(data.id))
    } else if (permission === "default") {
      window.notificationCallback = function() {
        return props.dispatch(subscribeCompetition(data.id))
      }
      modal("open", "notification-confirmation")
    } else {
      return alert(true, "Kamu tidak memberikan akses notifikasi untuk Kompetisi Id. Cek kembali setingan browser kamu", "error")
    }
  }

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
                        onClick={(e) => {
                          e.preventDefault()
                          _subscribeHandler()
                        } }
                        href="#"
                        title="subscribe kompetisi"
                      >
                        {data.is_subscribed ? "Unsubscribe Kompetisi" : "subscribe Kompetisi"}
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={(e) => {
                          e.preventDefault()
                          modal("open", "save-to-calendar")
                        }}
                        href="#"
                        title="simpan ke kalender"
                      >
                        Tambahkan ke Kalender
                      </a>
                    </li>
                    <li>
                      <a
                        className="scopy-button"
                        onClick={(e) => {
                          e.preventDefault()
                          handleCopyLink(link_competition)
                        }}
                        href="#"
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
      <AddToCalendarModal data={data} />
    </CompetitionDetailStyled>
  )
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
