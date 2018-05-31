import Styled from 'styled-components'
import { transparentBlack, mainWhite } from '../../../style/colors'

const ModalStyled = Styled.div`
  visibility: hidden; 
  opacity: 0;
  overflow-y: 'auto';
  overflow-x: 'hidden';
  background-color: ${transparentBlack};
  color: ${mainWhite};
  z-index: 20;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;    
  
  &.open {
    visibility: visible;
    opacity: 1;
  }
  
  a {
    color: ${mainWhite};
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

  /* small */
  @media only screen and (max-width: 543px) {
    .modal-title, a {
      font-size: 1.5em !important;
    }
  }

  /* medium screen */
  @media only screen and (min-width: 544px) and (max-width: 767px) {
    .modal-title,a  {
      font-size: 1.5em !important;
    }
  }
`

export default ModalStyled