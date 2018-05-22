import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Styled from 'styled-components'
import Navbar from '../navigations/TransparentNavbar'
import Slider from '../sliders'
import Count from '../cards/HomeCount'
import * as Colors from '../../../style/colors'

const DotsStyled = Styled.div`
  position: absolute;
  margin: auto;
  bottom: 0;
`

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

  .subheader-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`

const HomeSlider = Styled.div`
  color: #FFF;
  padding: 2em 0;
  text-align: center;
  h1 {
    font-size: 4em;
    padding: 1em 0 0.5em;
    margin: 0;
    line-height: 1.2;
  }
  .text{
    padding: 3em 0;
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

`

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

  componentWillReceiveProps(np) {
    if (np.slider.meta && np.slider.meta.code === 200) {
      this.setState({
        // totalSliders: 1 + np.slider.data.length + Static.length
      })
    }
  }

  componentDidMount() {
    this.sliderInterval = setInterval(() => {
      this.setActive()
    }, 5000)
  }

  setActive() {
    let { active } = this.state
    if (this.state.active < this.state.totalSliders - 1) {
      active++
    } else {
      active = 0
    }
    this.setState({ active })
  }

  componentWillUnmount() {
    clearInterval(this.sliderInterval)
  }

  render() {
    const { data, meta } = this.props.slider

    return (
      <SubHeader
        id="homepage-subheader"
        className={`row ${this.state.active === 0 ? 'bg-red' : 'bg-blue'}`}
      >
        <div className="container">
          {/* navbar */}
          <Navbar />
        </div>

        <div style={{position:'relative'}} className="container subheader-content">
          {/* {
              Static.length > 0 ?
                this.state.active < Static.length ?
                  <div 
                    className="row"
                    style={{width: "100%", height: "100%", backgroundSize: "cover", backgroundImage: `url(${Static[this.state.active].url})`}}
                  />
                : null
              : null
            } */}

          {/* slider */}
          <HomeSlider>
            {Static.length <= 0 ||
            (Static.length > 0 && this.state.active >= Static.length) ? (
              this.state.active === 0 ? (
                <WelcomeStaticSlider stats={this.props.stats} />
              ) : meta.code === 200 ? (
                <CompetitionSlider {...data[this.state.active - 1]} />
              ) : null
            ) : null}
          </HomeSlider>
          {/* end of slider */}

          {/* slider navigation */}
          <DotsStyled className="row">
            {(() => {
              let Dots = []
              for (let n = 0; n < this.state.totalSliders; n++) {
                Dots.push(
                  <span
                    key={n}
                    style={{
                      margin: '0 .3em',
                      color: '#FFF',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      this.setState({ active: n })
                    }}
                    className={
                      this.state.active === n
                        ? 'fa fa-circle'
                        : 'fa fa-circle-o'
                    }
                  />
                )
              }
              return Dots
            })()}
          </DotsStyled>
          {/* end of slider bavigation */}
        </div>
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
    <div className="row">
      <Count {...props.stats} />
    </div>
    <div className="row">
      {/* <Link
        to="/register"
        style={{ width: '150px' }}
        className="btn btn-white btn-rounded btn-lg"
      >
        Register
      </Link>
      <Link
        to="/login"
        style={{ width: '150px' }}
        className="btn btn-borderwhite btn-rounded btn-lg"
      >
        Login
      </Link> */}
      <Link
        to="/browse"
        className="btn btn-white btn-rounded btn-lg"
        style={{ borderColor: '#FFF', color: Colors.mainRed }}
      >
        Jelajah Kompetisi
      </Link>
      <Link to="/add" className="btn btn-borderwhite btn-rounded btn-lg">
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
  <div>
    <div className="col-md-12">
      <div className="col-md-8 col-md-offset-2">
        <h1 style={{ paddingBottom: 0 }}>{props.title}</h1>
        <h2 style={{ paddingBottom: '1em' }}>
          Hadiah senilai {props.total_hadiah}
        </h2>
      </div>
    </div>
    <div className="col-md-12">
      <Link
        to={`/competition/${props.id_kompetisi}/regulations/${
          props.nospace_title
        }`}
        style={{ width: '150px' }}
        className="btn btn-borderwhite btn-rounded btn-lg"
      >
        Selengkapnya
      </Link>
    </div>
    <div className="col-md-12">
      <div className="col-md-8 col-md-offset-2">
        <div className="text">{props.sort}</div>
      </div>
    </div>
  </div>
)

export default HomeSubHeader
