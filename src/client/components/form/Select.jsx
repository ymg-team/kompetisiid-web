import React, {Component} from 'react'
import Styled from "styled-components"

const SelectStyled = Styled.select`
  background: none;
  height: 40px;
`

class Select extends Component {

  static defaultProps = {
    validate: {}
  }

  render = () => {
    const {
      value,
      label,
      name,
      validate,
      autofocus
    } = this.props
    const is_valid = !(!validate.is_valid && validate.message)
    
    return (
      <div className={`form-child ${!is_valid ? "error" : ""}`}>
        <label htmlFor={name}>{label} { this.props.required ? <span className="text-red">*</span> : null }</label>
        <SelectStyled>
          <option value="1">opsi 1</option>
          <option value="2">opsi 2</option>
          <option value="3">opsi 3</option>
        </SelectStyled>
      </div>
    )
  }
}

export default Select
