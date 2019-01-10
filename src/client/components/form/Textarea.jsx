import React from "react"
import Styled from "styled-components"
import { validate, validator } from "./Validator"

const TextareaStyled = Styled.textarea`
  resize: none;
  overflow: auto;
  min-height: 50px;
  max-height: 100px;
`

export default class Textarea extends React.Component {
  componentDidMount = () => {
    validate(this.props)
  }

  handleChange = e => {
    const { value } = e.target
    this.autoGrow(e)
    this.props.setState(
      {
        [this.props.name]: value
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

  // auto set height of textarea
  autoGrow(e) {
    e.target.style.height = "5px"
    e.target.style.height = e.target.scrollHeight + "px"
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
        <label htmlFor={this.props.id || name}>
          {label}{" "}
          {this.props.required ? <span className="text-red">*</span> : null}
        </label>
        <TextareaStyled
          onChange={e => this.handleChange(e)}
          onBlur={e => this.handleChange(e)}
          type={type}
          name={name}
          id={this.props.id || name}
          value={value.replace(/[\u200B-\u200D\uFEFF]|\s\s/g, " ")}
          autoFocus={autofocus}
          placeholder={this.props.placeholder}
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

Textarea.defaultProps = {
  type: "text",
  required: false,
  placeholder: ""
}
