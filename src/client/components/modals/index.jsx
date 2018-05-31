import Styled from 'styled-components'
import { transparentBlack, mainWhite } from '../../../style/colors'

const ModalBgImage = [
  {
    url: 'http://res.cloudinary.com/dhjkktmal/image/upload/v1527807398/kompetisi-id/volcano-16912_1280.jpg',
    caption: 'Gunung Bromo, Kabupaten Probolinggo, Kabupaten Pasuruan, Kabupaten Lumajang, dan Kabupaten Malang, Jawa Timur - pixabay.com'
  },
  {
    url: 'http://res.cloudinary.com/dhjkktmal/image/upload/v1527807398/kompetisi-id/temple-2366184_1280.jpg',
    caption: 'Candi Borobudur, Magelang, Jawa Tengah - pixabay.com'
  },
  {
    url: 'http://res.cloudinary.com/dhjkktmal/image/upload/v1527807399/kompetisi-id/beach-3268191_1280.jpg',
    caption: 'Pantai Pok Tunggal, Gunung Kidul, DIY - pixabay.com'
  }
]

const ModalStyled = Styled.div`
  visibility: hidden; 
  opacity: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${transparentBlack};
  color: ${mainWhite};
  z-index: 20;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;    

  &:before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    
    display: block;
    background-image: url(${ModalBgImage[1].url});
    background-size:cover;
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

export function getRandomWallpaper(){
  const max = ModalBgImage.length
  const index = Math.round(Math.random() * Math.round(max))
  return ModalBgImage[index]
}

export default ModalStyled
