import React from "react"
import { eventFire } from "../../helpers/domEvents"
import { getCompetitionStatus } from "../../helpers/dateTime"
import copy from "copy-to-clipboard"
import Styled from "styled-components"

// components
import AddToCalendarModal from "../modals/AddToCalendar"
import { Link } from "react-router-dom"
import BtnJoin from "../buttons/BtnJoin"
import BtnSubscribe from "../buttons/BtnSubscribe"
import { alert } from "../Alert"
import BtnLike from "../buttons/BtnLikeCompetition"
import Label from "../Label"

const CompetitionDetailStyled = Styled.div`
  .competition-detail--title {
    line-height: 1.3;
    h1 {
      font-size: 2.5em;
      line-height: 1.2;
    }
    h1, p {
      margin: 0;
    }
  }
  img {
    max-width: 100% !important;
  }
  .alert {
    margin-top: 2em;
  }
  .competition-author {
    img {
      width: 50px !important;
      border-radius: 30px !important;
    }
  }
  .small-stats-icon {
    margin-right: 10px;
    cursor: default;
  }
  .competition-detail__left {
    padding: 0;
  }
  .competition-detail__right {
    padding:  0 0 0 40px;
  }

  // reponsivenes
  /* Large desktop */
  // @media (min-width: 1200px) { ... }
  
  /* Portrait tablet to landscape and desktop */
  // @media (min-width: 768px) and (max-width: 979px) { ... }
  
  /* Landscape phone to portrait tablet */
  @media (max-width: 767px) { 
    .competition-detail__right {
      padding:  0;
    }
  }
  
  /* Landscape phones and down */
  @media (max-width: 480px) { }
`

const hashtagGenerators = tags => {
  if (tags) {
    let hashtag = ""
    tags.split(",").map(n => {
      // remove all whitespace on string
      hashtag += ` #${n.replace(/\s/gm, "")}`
    })

    return `${hashtag}.`
  } else {
    return null
  }
}

const CompetitionDetailBox = props => {
  const { data } = props
  const link_competition = `https://kompetisi.id/c/${data.id}`

  const { is_ended, is_waiting } = getCompetitionStatus(
    data.deadline_at,
    data.announcement_at
  )

  return (
    <CompetitionDetailStyled id="competition-detail" className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="row m-30" />

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
              <Link to={`/user/${data.author.username}`}>
                {data.author.username}
              </Link>
              <br />
              <small>
                {data.created_in} di{" "}
                <a href={`/browse/${data.main_category.name}`}>
                  <strong>{data.main_category.name}</strong>
                </a>
                ,
                <a
                  href={`/browse/${data.main_category.name}/${data.sub_category.name}`}
                >
                  <strong>{data.sub_category.name}</strong>
                </a>
              </small>
            </p>
          </div>

          <div className="row competition-detail--meta">
            <div className="col-sm-6 align-center poster competition-detail__left">
              <img
                data-mediabox="my-gallery-name"
                data-title="Sample image"
                alt={data.title}
                className="poster image-modal-target"
                src={data.poster.original}
              />
            </div>
            <div className="col-sm-6 count competition-detail__right">
              <div className="only-mobile m-30" />
              {/* competition status */}
              <div style={{ marginBottom: "20px" }}>
                {is_ended ? (
                  <Label type="red" size="large">
                    <i className="fa fa-check" /> Kompetisi telah berakhir
                  </Label>
                ) : null}

                {is_waiting ? (
                  <Label type="yellow" size="large">
                    <i className="fa fa-flag" /> Kompetisi sedang berlangsung
                  </Label>
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
                <p>
                  {data.sort}
                  {hashtagGenerators(data.tag)}
                </p>
              </div>
              <div className="m-30" />

              {/* button to join competition */}
              <BtnJoin data={data} />
              {/* end of button to join competition */}

              {/* subscribe button */}
              <BtnSubscribe
                authData={props.authData}
                dispatch={props.dispatch}
                data={data}
              />
              {/* end if subscribe button */}

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
                        onClick={e => {
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
                        onClick={e => {
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
