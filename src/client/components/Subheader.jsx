import React from "react"
import { FilterJelajahStyled } from "./filters/Filter.styled"

export default props => (
  <FilterJelajahStyled
    style={{ textAlign: props.text_center ? "center" : "left" }}
    className="col-md-12 filter-jelajah"
  >
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>{props.title}</h1>
          <p className="text-muted">{props.desc}</p>
        </div>
      </div>
    </div>
  </FilterJelajahStyled>
)
