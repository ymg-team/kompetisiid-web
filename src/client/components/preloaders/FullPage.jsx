import React from 'react'
import Styled from 'styled-components'

export function fullPageLoader(show = true){
  const el = document.getElementById('ki-fullpage-loader')
  if(show) {
    el.style.display = 'flex'
    el.style.opacity = 100
  } else {
    el.style.display = 'none'
    el.style.opacity = 0
  }
}

const FullPageLoaderStyled = Styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  background-color: #ffffffd4;
  z-index: 20; 
  transition: opacity .3s ease;
  opacity: 0;
  display: none;

  .fullpage-loader {
    height: auto;
    width: 150px;
    text-align: center;
    .image {
      width: 100%;
      img {
        width: 100px;
      }
    }

    .fullpage-progressbar {
      margin-top: 25px;
      width: 100%;
      height: 10px;
      background-color: gray;
      position: relative;
    }

    .fullpage-progressbar:before {
      display: block; 
      position: absolute; 
      content: "";
      width: 20px;
      height: 10px;
      background-color: #f4f4f4;
      animation: loading 1.5s linear infinite;
    }

    @keyframes loading {
      from {
        left: 0; 
      }
      50% {
        left: calc(100% - 10px);
      }
      to {
        left: 0;
      }
    }
  }
`

const FullPageLoader = props => {
  return <FullPageLoaderStyled id="ki-fullpage-loader">
    <div className="fullpage-loader">
      <img src="https://res.cloudinary.com/dhjkktmal/image/upload/w_100,h_100,c_scale/v1528851826/kompetisi-id/email_assets/icon-512x512.png" alt="Kompetisi.id loader" />
      <div className="fullpage-progressbar" />
    </div>
  </FullPageLoaderStyled>
}

export default FullPageLoader
