import Styled from "styled-components"
import { Colors } from "../../../config/style"

export const ModalStyled = Styled.div`
  visibility: hidden; 
  opacity: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${Colors.transparentBlack};
  color: ${Colors.mainWhite};
  z-index: 20;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;   
  
  &.modal-white {
    color: ${Colors.mainGray};
    .modal-white-content {
      background-color: ${Colors.mainWhite} !important;
      padding: 0;
      .modal-title {
        padding: 1em;
        .btn-close-modal {
          top: 50%;
          right: .5em;
          margin-top: -17.5px;
        }
      }
    }
    a {
      color: ${Colors.mainGray} !important;
    }
  }
  
  &:before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    
    display: block;
    width: 100%;
    height: 100%;
    
    -webkit-filter: blur(5px) brightness(50%);
    -moz-filter: blur(5px) brightness(50%);
    -o-filter: blur(5px) brightness(50%);
    -ms-filter: blur(5px) brightness(50%);
    filter: blur(5px) brightness(50%);
  }
  
  &.open {
    visibility: visible;
    opacity: 1;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  
  a {
    color: ${Colors.mainWhite};
  }

  .modal-title {
    position: relative;
    font-size: 2em;
    padding: 1em 0;
    display: block;
    text-transform: capitalize;

    .btn-close-modal {
      position: absolute;
      top: 20px;
      right: 0;
      border: none;
      height: 35px;
      width: 35px;
      float: right;
      font-size: 22px !important;
      &:before {
        margin-left: -2px;
      }
    }
  } 

  /* small screen */
  @media only screen and (max-width: 543px) {
    .modal-title {
      font-size: 1.5em !important;
    }
  }

  /* medium screen */
  @media only screen and (min-width: 544px) and (max-width: 767px) {
    .modal-title {
      font-size: 1.5em !important;
    }
  }
`

export function getRandomWallpaper() {
  const max = ModalBgImage.length
  const index = Math.round(Math.random() * Math.round(max))
  return ModalBgImage[index]
}

export default ModalStyled
