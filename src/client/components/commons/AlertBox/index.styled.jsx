import Styled from "styled-components"
import { Colors } from "../../../../config/style"

const AlertBoxStyled = Styled.div`
&.alert {
    display: block; 
    padding: 10px;
    border-radius: 10px;
    &.alert-error {
        background-color: ${Colors.mainRed};
        color: ${Colors.mainWhite} ;
        border: 1px solid ${Colors.mainRed};
    }
    &.alert-warning {
        background-color: ${Colors.softYellow};
        color: ${Colors.mainBlack};
        border: 1px solid ${Colors.mainYellow};
    }
    &.alert-green {
        background-color: ${Colors.mainGreen};
        color: ${Colors.mainWhite};
        border: 1px solid ${Colors.mainGreen};
    }
    &.alert-blue {
        background-color: ${Colors.mainBlue};
        color: ${Colors.mainWhite};
        border: 1px solid ${Colors.mainBlue};
    }
}
`

export default AlertBoxStyled
