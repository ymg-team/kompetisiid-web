import React, { Component } from "react"
import Styled from "styled-components"
import { validate, validator } from "./Validator"

const SelectStyled = Styled.select`
  background: none;
  height: 40px;

  &.error {
    border-color: #cf3030 !important;
    color: #cf3030 !important;
  }
`

class Select extends Component {
  static defaultProps = {
    validate: {},
    options: []
  }
  
  componentDidMount = () => {
    validate(this.props)
  }

  componentWillReceiveProps = np => {
    // validate on edit / set default value
    if(!this.props.value && np.value) validate(np)
  }

  handleChange = e => {
    this.props.setState(
      {
        [this.props.name]: e.target.value
      },
      () => {
        this.validateInput()
      }
    )
  }

  validateInput(props = this.props) {
    const result = validate(props)
    this.props.setState({
      [this.props.name + "_validate"]: result
    })
  }

  render = () => {
    const {
      value,
      label,
      name,
      validate,
      autofocus,
      options,
      valueKey,
      textKey
    } = this.props
    const is_valid = !(!validate.is_valid && validate.message)

    return (
      <div className={`form-child ${!is_valid ? "error" : ""}`}>
        <label htmlFor={name}>
          {label}{" "}
          {this.props.required ? <span className="text-red">*</span> : null}
        </label>
        <SelectStyled
          className={`form-child ${!is_valid ? "error" : ""}`}
          onChange={e => this.handleChange(e)}
          value={this.props.value || ""}
        >
          <option value="0">--- Pilih salah satu ---</option>
          {this.props.options.map((n, key) => (
            <option key={key} value={n[valueKey] || "no value"}>
              {n[textKey] || "no text"}
            </option>
          ))}
        </SelectStyled>
      </div>
    )
  }
}

export default Select
