import React, { Component } from "react"
import { validator, validationSeter, validationChecker } from "./Validator"
import { alert } from "../Alert"

export default class Submit extends Component {
  handleClick() {
    if (Object.keys(validator).length < 1) {
      //no data input
      alert(true, "beberapa input wajib diisi", "error")
      this.props.setState(validationSeter(this.props.requiredInputs), () => {
        const errorEl = document.getElementsByClassName("error")[0]
        errorEl.scrollIntoView({ block: "end", behavior: "smooth" })
      })
    } else if (!validationChecker()) {
      alert(true, "beberapa input belum valid", "error")
      console.warn("FORM NOT VALID", validator)
      this.props.setState(validationSeter(this.props.requiredInputs), () => {
        const errorEl = document.getElementsByClassName("error")[0]
        errorEl.scrollIntoView({ block: "end", behavior: "smooth" })
      })
    } else {
      return this.props.action()
    }
  }

  render() {
    let { style, className } = this.props
    return (
      <div className="form-child" style={this.props.wrapperStyle}>
        <button
          id={this.props.id || ""}
          onClick={() => this.handleClick()}
          className={`${className} ${this.props.loading ? "loading" : ""}`}
          disabled={this.props.disabled || this.props.loading}
          style={style}
          type={this.props.type}
        >
          {this.props.loading ? "Memproses permintaan..." : this.props.text}
        </button>
      </div>
    )
  }
}

Submit.defaultProps = {
  type: "submit",
  disabled: false,
  className: "btn btn-white",
  style: {},
  wrapperStyle: {},
  requiredInputs: []
}
