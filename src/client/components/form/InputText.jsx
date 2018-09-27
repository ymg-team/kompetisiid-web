import React, { Component } from "react"
import { validate, validator } from "./Validator"

export default class InputText extends Component {
  handleChange(e) {
    this.props.setState(
      {
        [this.props.name]: e.target.value
      },
      () => {
        this.validateInput()
      }
    )
  }

  validateInput() {
    const result = validate(this.props)
    this.props.setState({
      [this.props.name + "_validate"]: result
    })
  }

  render() {
    const {
      min,
      max,
      value,
      label,
      name,
      type,
      validate,
      autofocus
    } = this.props
    const is_valid = !(!validate.is_valid && validate.message)
    return (
      <div className={`form-child ${!is_valid ? "error" : ""}`}>
        <label htmlFor={name}>{label} { this.props.required ? <span className="text-red">*</span> : null }</label>
        <input
          onChange={e => this.handleChange(e)}
          onBlur={e => this.handleChange(e)}
          type={type}
          name={name}
          id={name}
          value={value.replace(/[\u200B-\u200D\uFEFF]|\s\s/g, " ")}
          autoFocus={autofocus}
        />
        {max ? (
          <small>
            {value.length || 0}/{max} karakter <br />
          </small>
        ) : null}
        {!is_valid ? <small>{validate.message}</small> : null}
      </div>
    )
  }
}

InputText.defaultProps = {
  type: "text",
  required: false
}
