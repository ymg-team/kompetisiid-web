import React from "react"
import Styled from "styled-components"
import { Link } from "react-router-dom"

const BreadcrumbStyled = Styled.div`
 display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  margin-bottom: 30px;
  a {
      text-decoration: none !important;
  }
  &.breadcrumb {
    .breadcrumb-child {
      &:last-child {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .breadcrumb-child__arrow {
      padding: 0 5px;
    }
  }
`

const Breadcrumb = ({ position, breadcrumb = [] }) => {
  return (
    <BreadcrumbStyled position={position} className="breadcrumb">
      {breadcrumb.map((n, key) => (
        <div key={n.title} className="breadcrumb-child">
          <Link to={n.link}>{n.title}</Link>
          {key < breadcrumb.length - 1 ? (
            <span className="breadcrumb-child__arrow">/</span>
          ) : null}
        </div>
      ))}
    </BreadcrumbStyled>
  )
}

export default Breadcrumb
