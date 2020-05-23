import React, { Component } from "react"
import Styled from "styled-components"
import { nominalToText } from "../../helpers/number"
import { pushScript, pushStyle } from "../../helpers/domEvents"
import * as Colors from "../../../style/colors"

// components
import Loader from "../preloaders/HomeSlider"
import { Link } from "react-router-dom"

const SubHeader = Styled.div`
  margin: 50px 0 140px;
  transition: all .5s ease;

  &.bg-red {
    background-color: ${Colors.mainRed};
  }

  &.bg-blue {
    background-color: ${Colors.mainBlue};
  }

  .home-slider {
    padding: 30px 0 0;
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
      white-space: pre-wrap
    }
    h2 {
      color: ${Colors.mainGray};
      font-family: raleway, sans-serif;
      white-space: pre-wrap
    }
    .text{
      color: ${Colors.mainGray};
      padding: 3em 0;
      font-size: .9em;
      white-space: pre-wrap
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

    .glide__bullet {
      border: 1px solid rgb(58, 58, 58);
      &.glide__bullet--active {
        background: rgb(58, 58, 58);
      }
    }
  }

  /* responsiveness */

  /* small */
  @media only screen and (max-width: 543px) {
    h1 {
      font-size: 2em;
    }
    .competition-slider_text, .competition-slider_text .col-md-12 {
      padding: 0 !important;
    }
    margin-top: 10px !important;
  }

  /* medium screen */
  @media only screen and (min-width: 544px) and (max-width: 767px) {
    h1 {
      font-size: 2.5em;
    }
    .competition-slider_text, .competition-slider_text .col-md-12 {
      padding: 0 !important;
    }
    margin-top: 10px !important;
  }
`

class HomeSubHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderStart: false
    }
  }

  componentDidMount() {
    pushScript("/assets/vendors/glide/glide.min.js")
    pushStyle("/assets/vendors/glide/css/glide.core.min.css")
    pushStyle("/assets/vendors/glide/css/glide.theme.min.css")
  }

  renderSlider() {
    new Glide("#homepage-subheader", {
      type: "carousel",
      startAt: 0,
      perView: 1,
      hoverpause: true,
      animationDuration: 200,
      autoplay: 5000
    }).mount()
  }

  UNSAFE_componentWillReceiveProps(np) {
    if (
      np.slider.status &&
      np.slider.status === 200 &&
      !this.state.sliderStart
    ) {
      this.setState(
        {
          sliderStart: true
        },
        () => {
          setTimeout(() => {
            this.renderSlider()
          }, 100)
        }
      )
    }
  }

  render() {
    const { data = [] } = this.props.slider || {}

    return (
      <SubHeader>
        <div className="container subheader-content home-slider">
          <div
            style={data && data.length > 0 ? { marginBottom: 20 } : {}}
            className="glide"
            id="homepage-subheader"
          >
            <div className="glide__track" data-glide-el="track">
              {!this.state.sliderStart ? (
                <div style={{ width: "100%", height: "100%" }}>
                  <Loader />
                </div>
              ) : null}
              <div className="glide__slides">
                {data.map((n, key) => (
                  <CompetitionSlider key={key} {...n} />
                ))}
              </div>
            </div>
            <div
              className="glide__bullets"
              data-glide-el="controls[nav]"
              style={{ zoom: 1.8, marginTop: 20, bottom: "unset" }}
            >
              {data.map((n, key) => {
                return (
                  <button
                    className="glide__bullet"
                    data-glide-dir={`=${key}`}
                    key={key}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </SubHeader>
    )
  }
}

const CompetitionSlider = props => (
  <div className={`competition-slider`}>
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
