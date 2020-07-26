import React from "react"
import Styled from "styled-components"

const HeaderDashboard = Styled.div`
  margin-bottom: 20px;
  h1 {
    font-size: 2.5em;
    margin-bottom: 0;
  }
  border-bottom: ${props => (props.noBorder ? "none" : "1px solid lightgray")} ;
  margin-bottom: 50px;
`

export default props => (
  <HeaderDashboard noBorder={props.noBorder}>
    <h1>{props.title}</h1>
    <p className="text-muted">{props.text}</p>
  </HeaderDashboard>
)
