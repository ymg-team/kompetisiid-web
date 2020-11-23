import React, { Component } from "react"
import Loadable from "react-loadable"
import CareerStyled from "./index.styled"

// components
import Helmet from "../../components/Helmet"
import Loading from "../../components/preloaders/GlobalLoader"

const CareerBox = Loadable({
  loader: () => import("../../components/boxs/CareerBox"),
  loading: Loading
})

class CareersContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <CareerStyled>
        <Helmet
          title="Karir - Kompetisi Id"
          description="Mari bergabung bersama kami untuk terus meramaikan semangat kompetisi di Indonesia"
        />
        <CareerBox />
      </CareerStyled>
    )
  }
}

export default CareersContainer
