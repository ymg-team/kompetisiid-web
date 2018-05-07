import React from 'react'
import Styled from "styled-components"

const SubHeaderStyled = Styled.div`
`

const HeaderContentStyled = Styled.div`
  h2, h3 {
    font-weight: bold;
    margin: 0;
  }
  
  h2 {
    line-height: 1;
    font-size: 4em;
    color: #000;
  
    &:after {
      content: "";
      display: block;
      width: 50px;
      border-top: 8px solid #000;
      box-sizing: border-box;
      margin: 15px 0 25px 0;
      border-radius: 20px;
    }
  }
  
  h3 {
    font-size: 1.2em;
    margin: .5em 0;
    padding-left: 25px;
    width: 500px;
  }
    
`

const SubHeader = props => (
  <SubHeaderStyled className={props.customClass || "container p-50-0"}>
    <HeaderContentStyled className={"col-md-12"}>
      <h2>{props.title}</h2>
      <h3 className={"text-muted"}>{props.text}</h3>
    </HeaderContentStyled>
  </SubHeaderStyled>
)

export default SubHeader
