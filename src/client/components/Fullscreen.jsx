import styled from 'styled-components'
import * as Colors from "../../style/colors"

export const Fullscreen = styled.div`
  color: #fff;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;ß
  padding: 0 10px;
  &.error {
    background: ${Colors.mainRed};
  }
  &.login {
    background: ${Colors.mainRed};
  }
  &.login.login-super {
    background: ${Colors.darkGray};
  }
  &.bg-gray-soft {
    color: gray
  }
`
