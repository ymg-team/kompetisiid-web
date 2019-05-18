import React from "react"
import Styled from "styled-components"

const TitleLevel2 = Styled.div`
  border-bottom: 1px solid lightgray;
  padding-bottom: 20px;
  margin-bottom: 20px;
  h2 {
    margin-bottom: 0;
    font-size: 2em;
  }
  small {
    color: gray;
  }
`

export default props => (
  <TitleLevel2>
    <h2>{props.title}</h2>
    <small>{props.text}</small>
  </TitleLevel2>
)