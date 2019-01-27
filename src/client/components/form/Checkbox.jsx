import React from "react"

class Checkbox extends React.Component {
  changeHandler = e => {
    const {checked} = e.target 
    this.props.setState(
      {
        [this.props.name]: checked
      }
    )
  }

  render = () => {
    return (
      <div className={`form-child`}>
        <label htmlFor={this.props.id || this.props.name}>
          <input type="checkbox" onChange={e => this.changeHandler(e)} checked={this.props.value || false} />
          {" "}
          {this.props.label}{" "}
          {this.props.required ? <span className="text-red">*</span> : null}
        </label>
      </div>
    )
  }
}

export default Checkbox