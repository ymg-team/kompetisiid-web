import React from "react"
import { FilterJelajahStyled } from "./filters/Filter.styled"

// components
import Breadcrumb from "../components/navigations/Breadcrumb"

export default props => (
  <FilterJelajahStyled
    style={{ textAlign: props.text_center ? "center" : "left" }}
    className="col-md-12 filter-jelajah"
  >
    <div className="container">
      <div className="row">
        {props.breadcrumb ? (
          <div className="col-md-12">
            <Breadcrumb breadcrumb={props.breadcrumb} />
          </div>
        ) : null}
        <div className="col-md-12">
          <h1>{props.title}</h1>
          <p className="text-muted">{props.desc}</p>
        </div>
      </div>
    </div>
  </FilterJelajahStyled>
)
