import React from "react"
import Styled from "styled-components"

const GlobalLoader = Styled.div`
    padding: 20px 10px;
`

export default props => {
  return <GlobalLoader>{props.text || "Tunggu Sebentar..."}</GlobalLoader>
}
