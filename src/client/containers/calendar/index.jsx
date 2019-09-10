import React from "react"
import Helmet from "../../components/Helmet"
import Styled from "styled-components"
import SubHeader from "../../components/Subheader"
import CalendarBox from "../../components/boxs/CalendarBox"

const CalendarContainerStyled = Styled.div`

`

class CalendarContainer extends React.Component {
  state = {
    renderCalender: false
  }

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
        {this.state.renderCalender ? <CalendarBox /> : null}
      </CalendarContainerStyled>
    )
  }
}

export default CalendarContainer
