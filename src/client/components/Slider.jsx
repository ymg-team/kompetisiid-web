import React, { Component } from "react"
import Styled from "styled-components"
import PropTypes from "prop-types"

const SliderWrapper = Styled.div`
  position: relative;

  div.slider-items {
    width: 100%;
    display: -webkit-inline-box;
    transition: all 0.5s ease;
    overflow: hidden;
  }
`

class Slider extends Component {
  static propTypes = {
    id: PropTypes.string,
    dots: PropTypes.bool,
    navigation: PropTypes.bool,
    infinite: PropTypes.bool,
    speed: PropTypes.number,
    slidesToShow: PropTypes.number,
    auto: PropTypes.bool
  }

  static defaultProps = {
    dots: false,
    navigation: false,
    navigationStyle: {},
    infinite: false,
    speed: 1000,
    slidesToShow: 2,
    id: "slider",
    auto: true,
    className: ""
  }

  state = {
    active: 0,
    elSlider: null
  }

  componentDidMount() {
    this.setState({
      elSlider: document.querySelector(`#${this.props.id} .slider-items`)
    })
    this.elSlider = document.querySelector(`#${this.props.id} .slider-items`)
    if (this.props.auto) {
      this.sliderInterval = setInterval(() => {
        this.move("right")
      }, this.props.speed)
    }
  }

  componentWillUnmount() {
    clearInterval(this.sliderInterval)
  }

  move(target) {
    this.setState(
      {
        active: this.setActive(target)
      },
      () => {
        const width = this.getWidthChilds()
        this.state.elSlider.scroll({
          left: width * this.state.active,
          behavior: "smooth"
        })
      }
    )
  }

  setActive(scrollTarget) {
    const childCount = this.state.elSlider.childElementCount
    let { active } = this.state
    if (scrollTarget === "right") {
      if (active < childCount - 1) {
        active++
      } else {
        active = 0
      }
    } else {
      if (active > -1) {
        active--
      } else {
        active = childCount
      }
    }

    return active
  }

  getTotalChilds() {
    return this.elSlider.childElementCount
  }

  getWidthChilds() {
    let width = this.state.elSlider.offsetWidth
    return width
  }

  render() {
    return (
      <SliderWrapper id={this.props.id} className={this.props.className}>
        <div className="slider-items">{this.props.children}</div>
      </SliderWrapper>
    )
  }
}

export default Slider
