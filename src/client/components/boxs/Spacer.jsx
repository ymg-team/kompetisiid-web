import React from "react"
import PropTypes from "prop-types"

const Spacer  = props => {
  let style = {display:"block"}
  switch(props.size) {
    case "small":
        style.height = 10
        break
    case "medium":
        style.height = 30
        break
    case "large":
        style.height = 50
        break
  }
  return <div style={style}/>
}

Spacer.propTypes = {
  size: PropTypes.oneOf(["small","medium","large"])
}

Spacer.defaultProps = {
  size: "small"
}

export default Spacer
