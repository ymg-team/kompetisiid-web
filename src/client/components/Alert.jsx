import React from 'react'
import Styled from 'styled-components'
import * as Colors from '../../style/colors'

const Alert = Styled.div`
  display: block;
  position: fixed;
  width: 400px;
  left: 50%;
  top: -100px;
  margin-left: -200px;
  z-index: 100; 
  padding: 10px;
  text-align: center;
  background-color: ${Colors.darkGray}; 
  border: 1px solid ${Colors.mainWhite};
  color: ${Colors.mainWhite}; 
  cursor: pointer;
  transition: top .5s ease, padding .5s ease;
  
  &:hover {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  &.error {
    background-color: ${Colors.mainRed}; 
  }
  &.warning {
    background-color: ${Colors.mainYellow}; 
  }
  &.success {
    background-color: ${Colors.mainGreen}; 
  }

  /* small */
  @media only screen and (max-width: 543px) {
    max-width: 100%;
    right: 0;
  }

  /* medium screen */
  @media only screen and (min-width: 544px) and (max-width: 767px) {
    max-width: 100%;
    right: 0;
  }
`

export default props => (
  <Alert onClick={() => alert(false)} id="ki-alert">
    alert.. !
  </Alert>
)

let timeout

export function alert(show = true, text = '', type = '', fixed=false) {
  clearTimeout(timeout)

  if (typeof window !== 'undefined') {
    const alertEl = window.document.getElementById('ki-alert')

    if(alertEl) {
      if (show) {
        alertEl.classList.remove('success')
        alertEl.classList.remove('error')
        alertEl.classList.remove('warning')
  
  
        alertEl.innerText = text
        alertEl.classList.add(type)
        // alertEl.style.bottom = '20px'
        alertEl.style.top = '20px'
  
        if(!fixed) {
          timeout = setTimeout(() => {
            alertEl.style.top = '-100px'
            alertEl.classList.remove(type)
          }, 4000)
        }
      } else {
        alertEl.style.top = '-100px'
      }
    } else {
      console.err("alert element not available")
    }

  }
}
