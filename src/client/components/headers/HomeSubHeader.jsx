import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Styled from 'styled-components'
import Navbar from '../navigations/TransparentNavbar'
import Slider from '../sliders'
import Count from '../cards/HomeCount'
import * as Colors from '../../../style/colors'

const DotsStyled = Styled.div`
  position: absolute;
  width: auto;
  left: 50%;
  margin-left: -200px;
  bottom: 50px;
  width: 400px;
`

const SubHeader = Styled.div`
  padding-bottom: 100px;
  transition: all .5s ease;
  height: 800px;

  &.bg-red {
    background-color: ${Colors.mainRed};
  }

  &.bg-blue {
    background-color: ${Colors.mainBlue};
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
`

class HomeSubHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      totalSliders: 1
    }
  }

  componentWillReceiveProps(np) {
    if (np.slider.meta && np.slider.meta.code === 200) {
      this.setState({
        // active: 1,
        totalSliders: 1 + np.slider.data.length
      })
    }
  }

  componentDidMount() {
    this.sliderInterval = setInterval(() => {
      this.setActive()
    }, 2500)
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
        className={`col-md-12 ${
          this.state.active === 0 ? 'bg-red' : 'bg-blue'
        }`}
      >
        <div className="container">
          {/* navbar */}
          <Navbar />

          {/* slider */}
          <HomeSlider>
            {this.state.active === 0 ? (
              <WelcomeStaticSlider stats={this.props.stats} />
            ) : meta.code === 200 ? (
              <CompetitionSlider {...data[this.state.active - 1]} />
            ) : null}

            {/* slider navigation */}
            <DotsStyled className="col-md-12">
              {(() => {
                let Dots = []
                for (let n = 0; n < this.state.totalSliders; n++) {
                  Dots.push(
                    <span
                      key={n}
                      style={{ margin: '0 .3em', color: '#FFF' }}
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
          </HomeSlider>

          {/* end of slider */}
        </div>
      </SubHeader>
    )
  }
}

const WelcomeStaticSlider = props => (
  <div>
    <div className="col-md-12">
      <div className="col-md-6 col-md-offset-3">
        <h1>Setiap Hari Ada Hadiah Disini.</h1>
        </div>
    </div>
    <Count {...props.stats} />
    <div className="col-md-12">
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
      >
        Jelajah Kompetisi
      </Link>
      <Link
        to="/add"
        className="btn btn-borderwhite btn-rounded btn-lg"
      >
        Pasang Kompetisi
      </Link>
    </div>
    <div className="col-md-12">
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
          Hadiah senilai Rp {props.total_hadiah}
        </h2>
      </div>
    </div>
    <div className="col-md-12">
      <Link
        to={`/competition/${props.id_kompetisi}/regulations/${props.nospace_title}`}
        style={{ width: '150px' }}
        className="btn btn-borderwhite btn-rounded btn-lg"
      >
        Selengkanya
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
