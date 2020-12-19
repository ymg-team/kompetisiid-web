import Styled from "styled-components"

export const FilterJelajahStyled = Styled.div`
  &.filter-jelajah {
    padding: 50px 0;
    h1,
    h2 {
      margin: 5px 0;
      font-weight: normal;
    }
    a {
      text-decoration: underline;
    }
    .fa.fa-angle-down {
      padding: 0 10px;
      font-size: 26px;
    }
  }

  /* responsiveness */
  /* small */
  @media only screen and (max-width: 543px) {
    &.filter-jelajah { 
      padding: 15px 0 0 !important;
      h1, h2 {
        font-size: 20px;
      }
    }
  }
`
