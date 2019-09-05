import React from "react"
import Helmet from "../../components/Helmet"
import Styled from "styled-components"
import SubHeader from "../../components/Subheader"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"

const CalendarContainerStyled = Styled.div`

`

class CalendarContainer extends React.Component {

  dateGenerator() {
    return null
  }

  render() {
    const title = "Kalender Kompetisi"
    const desc =
      "Kelender kompetisi ini berisi berbagai waktu deadline dan pengumuman dari semua kompetisi di Kompetisi Id"

    return (
      <CalendarContainerStyled id="competition-calendar">
        <Helmet title={title} description={desc} />
        <SubHeader title={title} desc={desc} />
        <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
      </CalendarContainerStyled>
    )
  }
}

export default CalendarContainer
