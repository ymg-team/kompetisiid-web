import React from "react"
import Styled from "styled-components"
import { objToQuery } from "string-manager"

// components
import Modal from "./index"

const StyledCalendar = Styled.div`
  padding-bottom: 10px;
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

const AddToCalendarModal = props => {
  // paremeter to generate query on add to calendar menus
  const calendarParams = calendarParamsGenerator(props.data)
  return (
    <Modal className="modal-white" id="save-to-calendar">
      <div className="col-md-6 col-xs-12 modal-white-content">
        <div className="modal-title">
          Simpan ke kalender
          <a
            className="btn btn-white btn-close-modal btn-sm fas fa-times"
            href="#"
            onClick={e => e.preventDefault()}
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
  )
}

export default AddToCalendarModal

const calendarParamsGenerator = n => {
  let deadlineISOString = new Date(n.deadline_at * 1000).toISOString()
  deadlineISOString = deadlineISOString
    .replace(/-/g, "")
    .replace(/:/g, "")
    .replace(/\.000/g, "")

  const params = {
    deadlineTitle: `Deadline ${n.title} - Kompetisi Id`,
    details: `Untuk selengkapnya silahkan kunjungi https://kompetisi.id/c/${n.id}`,
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
