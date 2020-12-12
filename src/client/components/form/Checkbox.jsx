import React from "react"

const Checkbox = props => {
  /**
   * @desc function to handle check / uncheck component
   */
  const changeHandler = e => {
    const { checked } = e.target
    props.setState({
      [props.name]: checked
    })
  }

  return (
    <div className={`form-child`}>
      <label htmlFor={props.id || props.name}>
        <input
          type="checkbox"
          onChange={e => changeHandler(e)}
          checked={props.value || false}
        />{" "}
        {props.label}{" "}
        {props.required ? <span className="text-red">*</span> : null}
      </label>
    </div>
  )
}

export default Checkbox
