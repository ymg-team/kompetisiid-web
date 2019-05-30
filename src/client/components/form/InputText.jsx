import React, { Component } from "react"
import { validate } from "./Validator"

export default class InputText extends Component {
  componentDidMount = () => {
    validate(this.props)
  }

  componentWillReceiveProps = np => {
    // validate on edit / set default value
    if (!this.props.value && np.value) validate(np)
  }

  handleChange = e => {
    const { value } = e.target
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

  render() {
    const {
      min,
      max,
      value,
      label,
      name,
      type,
      validate,
      autoFocus,
      autoComplete,
      note
    } = this.props
    const is_valid = !(!validate.is_valid && validate.message)
    return (
      <div className={`form-child ${!is_valid ? "error" : ""}`}>
        <label
          htmlFor={this.props.id || name}
          style={note ? { margin: "10px 0 5px" } : {}}
        >
          {label}{" "}
          {this.props.required ? <span className="text-red">*</span> : null}
        </label>
        {note ? <small>{note}</small> : null}
        <input
          readOnly={this.props.readOnly}
          onChange={e => this.handleChange(e)}
          onBlur={e => this.handleChange(e)}
          type={type}
          name={name}
          id={this.props.id || name}
          // value={type === "number" ? value : value.replace(/[\u200B-\u200D\uFEFF]|\s\s/g, " ")}
          value={value}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
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

InputText.defaultProps = {
  type: "text",
  readOnly: false,
  required: false,
  autoFocus: false,
  autoComplete: "off",
  placeholder: ""
}
