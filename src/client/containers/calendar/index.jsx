import React from "react"
import Styled from "styled-components"

// component
import Helmet from "../../components/Helmet"
import SubHeader from "../../components/Subheader"
import CalendarBox from "../../components/boxs/CalendarBox"
import GAds from "../../components/cards/GoogleAds"

class CalendarContainer extends React.Component {
  componentDidMount() {
    window.scroll(0, 0)
  }

  render() {
    const title = "Kalender Kompetisi"
    const desc =
      "Kelender kompetisi ini berisi berbagai waktu deadline dan pengumuman dari semua kompetisi di Kompetisi Id"

    return (
      <React.Fragment>
        <Helmet title={title} description={desc} />
        <SubHeader title={title} desc={desc} />
        <div className="row">
          <div className="col-md-12 align-center">
            <GAds
              adClient="ca-pub-4468477322781117"
              adSlot={1041612608}
              timeout={1000}
            />
          </div>
        </div>
        <CalendarBox />
      </React.Fragment>
    )
  }
}

export default CalendarContainer
