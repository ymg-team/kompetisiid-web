import React, { Component } from "react"
import { validate, validator } from "./Validator"

export default class InputFile extends Component {
  static defaultProps = {
    type: "file",
    max: 1000000,
    customStyle: {},
    customStylePreview: {width: 150},
    accept: ""
  }

  state = {}

  componentDidMount = () => {
    validate(this.props)
  }

  handleChange(e) {
    const { files } = e.target
    if (files[0]) {

      // get preview if upload image
      if(this.props.accept.includes("image/")) {
        const reader = new FileReader()
        reader.onload = e => {
          this.setState({image_preview: e.target.result})
        }
        reader.readAsDataURL(files[0])
      }

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
    const { max, label, name, validate, required, preview } = this.props
    const is_valid = !(!validate.is_valid && validate.message)
    return (
      <div
        style={this.props.customStyle}
        className={`form-child ${!is_valid ? "error" : ""}`}
      >
        {label ? (
          <label htmlFor={this.props.id || name}>
            {label} {required ? <span className="text-red">*</span> : null}
          </label>
        ) : null}

        {
          this.state.image_preview || preview ?
          <img style={this.props.customStylePreview} src={this.state.image_preview || preview} alt="preview" />
          : null
        }

        <input
          name={name}
          type="file"
          id={this.props.id || name}
          onChange={e => this.handleChange(e)}
          onBlur={e => this.handleChange(e)}
          style={this.props.customStyleInput || {}}
          accept={this.props.accept}
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
