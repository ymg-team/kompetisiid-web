import React from "react"
import Styled from "styled-components"
import { Colors } from "../../../config/style"

const SubHeaderStyled = Styled.div`
  padding: 50px 10px;

  h3 {
    margin-bottom: 0;
  }

  /* responsiveness */

  /* small */
  @media only screen and (max-width: 543px) {
    &.container {
      padding: 15px 0 !important;
    }
    
  }

  /* medium screen */
  @media only screen and (min-width: 544px) and (max-width: 767px) {
    &.container {
      padding: 15px 0 !important;
    }
  }
`

const HeaderContentStyled = Styled.div`
  h2 {
    font-weight: bold;
    margin: 0;
    line-height: 1;
    font-size: 2.5em;

    &:after {
      content: "";
      display: block;
      width: 30px;
      border-top: 8px solid ${Colors.mainGray};
      box-sizing: border-box;
      margin: 15px 0 25px 0;
      border-radius: 5px;
    }
  }

  h3 {
    font-weight: 400;
    font-size: 1.2em;
    margin: .5em 0 0;
    width: 500px;
    max-width: 100%;
  }

  @media only screen and (max-width: 543px) {
    h2 {
      font-size: 20px;
    }
    h3 {
      font-size: 18px;
    }
  }
`

const SubHeader = props => (
  <SubHeaderStyled
    style={props.customStyle || {}}
    className={props.customClass || "container"}
  >
    <HeaderContentStyled className={props.customClassContent || ""}>
      <h2>{props.title}</h2>
      <h3>{props.text}</h3>
    </HeaderContentStyled>
  </SubHeaderStyled>
)

export default SubHeader
