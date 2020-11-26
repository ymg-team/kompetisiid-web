import React from "react"
import Styled from "styled-components"
import { Colors } from "../../../config/style"

// components
import { Link } from "react-router-dom"
import Label from "../Label"

export const TabStyled = Styled.div`
  &.container-competition-tab {
    border-top: 1px solid ${Colors.softGray};
    border-bottom: 1px solid ${Colors.softGray};
    display: flex;
    margin-top: 50em;
    li {
      margin-right: 3em;
      a {
        width: max-content;
        padding: 1em 0;
        display: inline-block;
        text-decoration: none;
        text-transform: capitalize;
        &:hover {
          color: ${Colors.mainGray};
          font-weight: bold;
        }
      }
          
      &.active {
        border-bottom: 4px solid ${Colors.mainRed};
        a {
          font-weight: bold;
          color: ${Colors.mainRed};
        }
        .label.label-gray {
          background: ${Colors.mainRed};
        }
      }
          
    }
    .btn-join {
      opacity: 0;
    }
    &.fixed {
      top: 0;
      z-index: 10;
      position: fixed;
      width: 100%;
      background: ${Colors.mainWhite};
    }
  }
`

export default props => (
  <TabStyled
    className="container-competition-tab"
    style={{ margin: "20px 0 20px" }}
  >
    <ul className="horizontal-menu">
      {props.tabs.map((n, key) => {
        return (
          <li key={key} className={n.is_active ? "active" : ""}>
            <Link to={n.target}>
              {n.text} {n.count ? <Label type="gray" text={n.count} /> : null}
            </Link>
          </li>
        )
      })}
    </ul>
  </TabStyled>
)
