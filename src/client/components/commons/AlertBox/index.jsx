import React from "react"
import AlertBoxStyled from "./index.styled"

const AlertBox = props => {
  return (
    <AlertBoxStyled
      style={{ marginTop: 0 }}
      className={`alert alert-${props.type}`}
    >
      {props.children}
    </AlertBoxStyled>
  )
}

export default AlertBox
