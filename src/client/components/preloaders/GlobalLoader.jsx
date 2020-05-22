import React from "react"
import styled from "styled-components"

const GlobalLoader = styled.div`
  &.global-loader {
    width: 100%
    padding: 2em;
    font-size: 2em;
    color: #545454;
    .fa-circle-notch {
      display: flex;
      align-items: center;
      justify-content: center;

      -webkit-animation: rotating 1.3s linear infinite;
      -moz-animation: rotating 1.3s linear infinite;
      -ms-animation: rotating 1.3s linear infinite;
      -o-animation: rotating 1.3s linear infinite;
      animation: rotating 1.3s linear infinite;

      @-webkit-keyframes rotating /* Safari and Chrome */ {
        from {
          -webkit-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        to {
          -webkit-transform: rotate(360deg);
          -o-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      @keyframes rotating {
        from {
          -ms-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        to {
          -ms-transform: rotate(360deg);
          -moz-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          -o-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      } 
    }
  }
`

export default () => {
  return (
    <GlobalLoader className="global-loader">
      <span className="fas fa-circle-notch" />
    </GlobalLoader>
  )
}
