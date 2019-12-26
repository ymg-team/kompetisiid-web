import React from "react"
import Styled from "styled-components"
import { ModalStyled } from "./index"

const ImageModalStyled = Styled(ModalStyled)`
  transition: opacity .2s linear;
  
  .image-modal-content {
    width: 100vw; 
    height: calc(100vh - 41px);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    
    /* z-index: 100; */
  }
  .image-modal-action {
    position: relative;
    width: 100vw;
    padding: 10px;
    color: #FFF;
    text-align: center; 
  }
`

export default props => {
  const closeHandler = () => {
    console.log("close image modal...")
  }

  return (
    <ImageModalStyled id="image-modal">
      <div className="image-modal-content" />
      <div className="image-modal-action">
        Klik di mana saja untuk keluar
      </div>
    </ImageModalStyled>
  )
}
