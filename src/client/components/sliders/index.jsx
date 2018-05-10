import React, { Component } from 'react'
import Styled from 'styled-components'

const SliderContainer = Styled.div`
  position: relative;

  div.slider-items {
    width: 100%;
    display: -webkit-inline-box;
    transition: all 0.5s ease;
    overflow: hidden;
  }

  button {
    background: transparent;
    border: none;
  }

  .c-prev {
    position: absolute;
    cursor: pointer;
    top: 46%;
    left: 10px;
    z-index: 10;

    @media (max-width: 979px) {
      top: 41%;
    }

    /* img {
      height: 30px;
      width: 30px;
    } */

  }

  .c-next {
    position: absolute;
    cursor: pointer;
    top: 46%;
    right: 10px;
    z-index: 10;

    @media (max-width: 979px) {
      top: 41%;
    }

    /* img {
      height: 30px;
      width: 30px;
    } */

  }

`

class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      elSlider: null
    }
  }

  componentDidMount() {
    this.setState({
      elSlider: document.querySelector(`#${this.props.id} .slider-items`)
    })
    this.elSlider = document.querySelector(`#${this.props.id} .slider-items`)
    if (this.props.auto) {
      this.sliderInterval = setInterval(() => {
        this.move('right')
      }, this.props.speed)
    }
  }

  componentWillUnmount() {
    clearInterval(this.sliderInterval)
  }

  move() {
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

  render() {
    return (
      <SliderContainer id={this.props.id} className={this.props.className}>
        <div className="slider-items">{this.props.children}</div>
      </SliderContainer>
    )
  }
}

export default Slider
