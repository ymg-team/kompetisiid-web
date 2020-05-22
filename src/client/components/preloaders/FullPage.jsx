import React from "react"
import Styled from "styled-components"

export function fullPageLoader(show = true) {
  const el = document.getElementById("ki-fullpage-loader")
  if (show) {
    el.style.display = "flex"
    el.style.opacity = 100
  } else {
    el.style.display = "none"
    el.style.opacity = 0
  }
}

const FullPageLoaderStyled = Styled.div`
  &#ki-fullpage-loader {
    width: 100vw;
    height: 100vh;
    /* display: flex; */
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #ffffff;
    z-index: 20; 
    transition: opacity .3s ease;
    opacity: ${props => (props.show ? 100 : 0)};
    display: ${props => (props.show ? "flex" : "none")};

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
  }
`

const FullPageLoader = props => {
  return (
    <FullPageLoaderStyled id="ki-fullpage-loader" {...props}>
      <div className="fullpage-loader">
        <img
          src="/assets/4.2/logos/icon-512x512.png"
          alt="Kompetisi.id Logo Loader"
        />
        <div className="fullpage-progressbar" />
      </div>
    </FullPageLoaderStyled>
  )
}

export default FullPageLoader
