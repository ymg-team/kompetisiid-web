import React, { Component } from "react"
import { validate, validator } from "./Validator"

export default class InputFile extends Component {
  static defaultProps = {
    type: "file",
    max: 1000000,
    customStyle: {}
  }

  componentDidMount = () => {
    validate(this.props)
  }

  handleChange(e) {
    const { files } = e.target
    if (files[0]) {
      this.props.setState(
        {
          [this.props.name]: files[0]
        },
        () => {
          this.validateInput()
        }
      )
    }
  }

  validateInput(props = this.props) {
    const result = validate(props)
    this.props.setState({
      [this.props.name + "_validate"]: result
    })
  }

  render() {
    const { max, label, name, validate, required } = this.props
    const is_valid = !(!validate.is_valid && validate.message)
    return (
      <div
        style={this.props.customStyle}
        className={`form-child ${!is_valid ? "error" : ""}`}
      >
        <label htmlFor={name}>
          {label} {required ? <span className="text-red">*</span> : null}
        </label>
        <input
          name={name}
          type="file"
          id={this.props.id || name}
          onChange={e => this.handleChange(e)}
          onBlur={e => this.handleChange(e)}
        />
        <small>
          maks {max / 1000000}
          MB
        </small>
        {!is_valid ? (
          <small>
            <br />
            {validate.message}
          </small>
        ) : null}
      </div>
    )
  }
}
