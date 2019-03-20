import React from "react"
import { validate, validator } from "./Validator"

export default class DatePicker extends React.Component {
  static defaultProps = {
    config: {}
  }

  componentDidMount = () => {
    validate(this.props)

    let { config } = this.props
    config = Object.assign(
      {
        field: document.getElementById(this.props.id || this.props.name),
        format: "D MMM YYYY",
        onSelect: val => {
          this.props.setState(
            {
              [this.props.name]: val
            },
            () => {
              this.validateInput()
            }
          )
        }
      },
      config
    )
    setTimeout(() => {
      this.picker = new Pikaday(config)

      // set default Pikaday value
      if (this.props.value) {
        console.log("set timepicket value", this.props.value)
        this.picker.setDate(this.props.value)
      }
    }, 2000)
  }

  componentWillReceiveProps = np => {
    // validate on edit / set default value
    if (!this.props.value && np.value) validate(np)
  }

  validateInput(props = this.props) {
    const result = validate(props)
    this.props.setState({
      [this.props.name + "_validate"]: result
    })
  }

  render = () => {
    const is_valid = !(
      !this.props.validate.is_valid && this.props.validate.message
    )
    return (
      <div className={`form-child ${!is_valid ? "error" : ""}`}>
        {this.props.label ? (
          <label htmlFor={this.props.id || this.props.name}>
            {this.props.label}{" "}
            {this.props.required ? <span className="text-red">*</span> : null}
          </label>
        ) : null}
        <input
          type="text"
          id={this.props.id || this.props.name}
          autoComplete={"off"}
        />
        {!is_valid ? <small>{validate.message}</small> : null}
      </div>
    )
  }
}
