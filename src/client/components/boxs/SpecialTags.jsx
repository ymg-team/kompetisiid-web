import React from "react"
import Styled from "styled-components"

const SpecialTagsStyled = Styled.div`
  margin-top: 50px;
  .col-md-12 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .specialtags-image {
    float: left;
    margin-right: 35px;
    max-width: 200px;
  }
  .specialtags-description {
    h1 {
      margin-bottom: -10px;
    }
  }
  padding: 25px 0;
  margin-bottom: 25px;
`

const SpecialTags = props => {
  return (
    <SpecialTagsStyled className="container">
      <div className="col-md-12">
        <img className="specialtags-image hide-mobile" src={props.image} />
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
