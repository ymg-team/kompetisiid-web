import React, { Component } from "react"
import Styled from "styled-components"
import { nominalToText } from "../../helpers/number"
import * as Colors from "../../../style/colors"

// components
import { Link } from "react-router-dom"
import Slider from "../sliders"
import Count from "../cards/HomeCount"

const SubHeader = Styled.div`
  padding-bottom: 100px;
  transition: all .5s ease;
  height: 100vh;
  min-height: 750px;
  

  &.bg-red {
    background-color: ${Colors.mainRed};
  }

  &.bg-blue {
    background-color: ${Colors.mainBlue};
  }

  .home-slider {
    color: ${Colors.mainGray};
    padding: 2em 0 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    h1 {
      color: ${Colors.mainGray};
      font-size: 3em;
      font-family: raleway, sans-serif;
      text-transform: uppercase;
      letter-spacing: 4px;
      line-height: 1.1;
      padding: 1em 0 0.5em;
      margin: 0;
    }
    h2 {
      color: ${Colors.mainGray};
      font-family: raleway, sans-serif;
    }
    .text{
      color: ${Colors.mainGray};
      padding: 3em 0;
      font-size: .9em;
    }

    .competition-slider {
      text-align: left;
      .competition-slider_poster {
        height: 450px;
        background-size: cover;
        border-radius: 24px;
      }
      .competition-slider_text {
        h1 {
          font-family: inherit;
          font-size: 35px;
          letter-spacing: 1px;
        }
        h2 {
          font-size: 25px;
        }
        .text {
          padding: 0;
          margin: 0 0 2.5em;
        }
      }  
    }

    /* responsiveness */

    /* small */
    @media only screen and (max-width: 543px) {
      h1 {
        font-size: 2em;
      }
    }

    /* medium screen */
    @media only screen and (min-width: 544px) and (max-width: 767px) {
      h1 {
        font-size: 2.5em;
      }
    }
  }
`

// const HomeSlider = Styled.div`

// `

const Static = [
  // {
  //   url: "http://res.cloudinary.com/dhjkktmal/image/upload/v1526547300/kompetisi-id/Screen_Shot_2018-05-17_at_15.54.33.png",
  //   title: "Ramadhan Kareem for kompetisi.id"
  // }
]

class HomeSubHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      totalSliders: 1 + Static.length
    }
  }

  UNSAFE_componentWillReceiveProps(np) {
    if (np.slider.status && np.slider.status === 200) {
      this.setState({
        totalSliders: 1 + np.slider.data.length + Static.length
      })
    }
  }

  render() {
    const { data, status, message } = this.props.slider

    return (
      <SubHeader id="homepage-subheader">
        <Slider className="container subheader-content home-slider">
          {/* <WelcomeStaticSlider stats={this.props.stats} /> */}
          {status && status === 200
            ? data.map((n, key) => <CompetitionSlider key={key} {...n} />)
            : null}
        </Slider>
      </SubHeader>
    )
  }
}

const WelcomeStaticSlider = props => (
  <div>
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <h1>Setiap Hari Ada Hadiah Disini.</h1>
      </div>
    </div>
    <div className="row hide-mobile">
      <Count {...props.stats} />
    </div>
    <div className="row">
      <Link to="/browse" className="btn btn-bordergray btn-rounded btn-lg">
        Jelajah Kompetisi&nbsp;
        <i className="fas fa-arrow-alt-circle-right" />
      </Link>
      <Link to="/add" className="btn btn-bordergray btn-rounded btn-lg">
        Pasang Kompetisi
      </Link>
    </div>
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <div className="text">
          Kompetisi.id membuka kesempatan untuk para penyelenggara kompetisi ini
          memasang kompetisi disini atau pun bekerja dengan Kompetisi.id.
          Sebagai peserta kamu juga bisa menemukan beragam kompetisi keren
          dengan hadiah menari yang sesuai dengan interest kamu.
        </div>
      </div>
    </div>
  </div>
)

const CompetitionSlider = props => (
  <div className="competition-slider">
    <div
      className="hide-mobile competition-slider_poster col-md-6"
      style={{ backgroundImage: `url(${props.poster.original})` }}
    />
    <div className="competition-slider_text col-md-6">
      <div className="col-md-12">
        <h1 style={{ paddingBottom: 0 }}>{props.title}</h1>
        <h2>Hadiah senilai {nominalToText(props.prize.total)}</h2>
      </div>
      <div className="col-md-12">
        <div className="text">{props.sort}</div>
        <Link
          to={`/competition/${props.id}/regulations/${props.nospace_title}`}
          className="btn btn-bordergray btn-rounded btn-md"
        >
          Selengkapnya
        </Link>
      </div>
    </div>
  </div>
)

export default HomeSubHeader
