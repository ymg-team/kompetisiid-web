import React from "react"
import LabelStyled from "./index.styled"

const Label = props => {
  return (
    <LabelStyled
      title=""
      className={`label ${props.circle ? "label-circle" : ""} ${
        props.size === "large" ? "label-lg" : ""
      } label-${props.type}`}
    >
      {typeof props.text !== "undefined"
        ? props.text.toString()
        : props.children}
    </LabelStyled>
  )
}

Label.defaultProps = {
  type: "gray",
  size: "",
  circle: false,
  children: null,
  title: ""
}

export default Label
