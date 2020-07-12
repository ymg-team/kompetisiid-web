import React from "react"
import Styled from "styled-components"

const Preloader = Styled.div`
  .preloader-poster.animated-background {
    height: 400px;
    margin-bottom: 20px;
  }

  .preloader-meta.animated-background {
    height: 208px;
    margin-bottom: 20px;

    .background-masker-competition-1 {
      height: 40px;
      left: 30%;
      width: 70%;
      bottom: 0;
    }

    .background-masker-competition-2 {
      height: 40px;
      top: 40px;
      width: 100%;
    }

    .background-masker-competition-3 {
      height: 46px;
      top: 125px;
      width: 100%;
    }
  }

  /* responsiveness */

  /* small */
  @media only screen and (max-width: 543px) {
    margin-top: 50px;
    .col-md-6 {
      padding: 0 !important;
    }
  }

  /* medium screen */
  @media only screen and (min-width: 544px) and (max-width: 767px) {
    margin-top: 50px;
    .col-md-6 {
      padding: 0 !important;
    }
  }

`

const CompetitionDetailPreloader = props => (
  <Preloader className={"no-padding"}>
    <div className={"col-md-6"}>
      <div className={"preloader-poster animated-background"}>
        <div className="background-masker background-masker-competition-1" />
        <div className="background-masker background-masker-competition-2" />
      </div>
    </div>
    <div className={"col-md-6"}>
      <div className={"preloader-meta animated-background"}>
        <div className="background-masker background-masker-competition-1" />
        <div className="background-masker background-masker-competition-2" />
        <div className="background-masker background-masker-competition-3" />
      </div>
    </div>
  </Preloader>
)

export default CompetitionDetailPreloader
