import Styled from "styled-components"
import { Colors } from "../../../config/style"

const LabelStyled = Styled.div`
&.label {
    font-size: 0.7em;
    padding: 0.3em 0.5em;
    display: inline-block;
    font-weight: bold;
    border-radius: 0.5em;
    color: ${Colors.mainWhite};
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    background-color:  ${Colors.mainGray};
    &.label-circle {
        border-radius: 100px;
    }
    &.label-white {
        border: 1px solid ${Colors.softGray};
        background-color: ${Colors.mainWhite};
        color: ${Colors.mainGray};
    }
    &.label-green {
        background-color: ${Colors.mainGreen};
    }
    &.label-blue {
        background-color: ${Colors.mainBlue};
    }
    &.label-gray {
        background-color: ${Colors.mainGray};
    }
    &.label-yellow {
        background-color: ${Colors.mainYellow};
    }
    &.label-red {
        background-color: ${Colors.mainRed};
    }
    &.label-lg {
        font-size: 1em;
        padding: 0.4em 0.6em;
    }
} 
`

export default LabelStyled
