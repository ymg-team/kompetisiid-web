import React from "react"
import Styled from "styled-components"

const SpecialTagsStyled = Styled.div`
  .specialtags-image {
    float: left;
    margin-right: 20px;
    max-width: 100%;
  }
  border-bottom: 1px solid lightgray;
  padding: 25px 0;
  margin-bottom: 25px;
`

const SpecialTags = props => {
  return (
    <SpecialTagsStyled className="container">
      <div className="col-md-12">
        <img className="specialtags-image" src={props.image} />
        <span className="specialtags-description">
          <h1>{props.name}</h1>
          <p>
            {props.description}{" "}
            <a href={props.link} target="_blank">
              Selengkapnya
            </a>
          </p>
        </span>
      </div>
    </SpecialTagsStyled>
  )
}

export default SpecialTags
