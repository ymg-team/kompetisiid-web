import React from "react"
import Styled from "styled-components"
import { Link } from "react-router-dom"
import Label from "../Label"

const SidebarMobileStyle = `
  background: #ececec;
  position: fixed;
  z-index: 1;
  height: 100vh;
  left: -100%;
  top: 57px;
  transition: all .5s ease;
  padding: 0 15px; 
  overflow: auto;
  &.active {
    left: 0;
  } 
`

export const SidebarStyled = Styled.div`
ul {
  list-style: none;
  padding: 0;
  li {
    padding: 0.5em 0;
    strong {
      margin-top: 30px;
      display: block;
    }
    a {
      text-decoration: none;
      &:hover, &:focus, &.active {
        font-weight: bold;
      }
    }
    &.active {
      a {
        font-weight: bold;
      }
    }
    
  }
}

// responsiveness

// small screen
@media only screen and (max-width: 543px) {
  ${SidebarMobileStyle}
}

// medium screen
@media only screen and (min-width: 544px) and (max-width: 767px) {
  ${SidebarMobileStyle}
}
`

const Sidebar = props => {
  return (
    <SidebarStyled className="dashboard-sidebar" id="dashboard-sidebar">
      <ul>
        {props.menus.map(n => {
          return (
            <React.Fragment key={n.title}>
              <li>
                {!n.child ? (
                  n.to !== "#" ? (
                    <Link to={n.to}>{n.title}</Link>
                  ) : (
                    <a
                      onClick={e => {
                        e.preventDefault()
                        n.onClick()
                      }}
                      href="#"
                    >
                      {n.title}
                    </a>
                  )
                ) : (
                  <strong>{n.title}</strong>
                )}
              </li>
              {n.child
                ? n.child.map(m => {
                    return !m.hide ? (
                      <li key={m.title}>
                        {m.to === "#" ? (
                          <a
                            onClick={e => {
                              e.preventDefault()
                              m.onClick()
                            }}
                            href="#"
                          >
                            {m.title}
                          </a>
                        ) : (
                          <Link to={m.to}>
                            {m.icon ? <i className={m.icon} /> : null} {m.title}
                            {m.label ? (
                              <React.Fragment>
                                &nbsp;
                                <Label
                                  type={m.label.color || "blue"}
                                  text={m.label.text}
                                />
                              </React.Fragment>
                            ) : null}
                          </Link>
                        )}
                      </li>
                    ) : null
                  })
                : null}
            </React.Fragment>
          )
        })}
      </ul>
    </SidebarStyled>
  )
}

export default Sidebar
