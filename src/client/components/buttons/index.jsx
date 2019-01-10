import React from "react"
import Styled from "styled-components"
import PropTypes from "prop-types"

const ButtonStyled = Styled.button`
  background-color: #FFF;
  color: #000;
  
  
  ${props => {
    switch (props.size) {
      case "medium":
        return ``
      case "large":
        return ``
      default:
        return `
          font-size: 12px;
          padding: 2px 5px;`
    } 
}}

${
  props => {
    switch (props.color) {
      case "red":
        return `
          background: #ea4b35;
          color: #FFF;
          border: 1px solid #c53d25;
        `
      default:
        return ``
    } 
  }
  }
`

class Button extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.oneOf(["small", "medium", "large"])
  }

  static defaultProps = {
    text: "Button Text",
  }

  render = () => {
    return <ButtonStyled
      onClick={() => this.props.onClick()}
    >
      {this.props.children || this.props.text }
    </ButtonStyled>
  }
}

export default Button
