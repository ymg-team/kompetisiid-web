import React from 'react'
import Styled from "styled-components"

const Preloader = Styled.div`
  height: 100vh;
  
  .preloader-author.animated-background {
    width: 280px;
    margin-top: 50px;
    margin-bottom: 20px;
    height: 50px;
    
    .background-masker-competition-1 {
      height: 50px;
      left: 60px;
      width: 10px;
    }
    .background-masker-competition-2 {
      top: 20px;
      height: 10px;
      left: 60px;
      width: 220px;
    }
  }
  
  .preloader-poster.animated-background {
    height: 400px;
    margin-bottom: 20px;
  }
  
  .preloader-meta.animated-background {
    height: 180px;
    margin-bottom: 20px;
    
    .background-masker-competition-1 {
      height: 40px;
      left: 30%;
      width: 70%;
    }
    
    .background-masker-competition-2 {
      height: 40px;
      top: 40px;
      width: 100%;
    }
    
    .background-masker-competition-3 {
      height: 10px;
      top: 125px;
      width: 100%;
    }
  }
`

const CompetitionDetailPreloader = props => (
  <Preloader className={"container"}>
    <div className={"col-md-12"}>
      <div className={"preloader-author animated-background"}>
        <div className='background-masker background-masker-competition-1'/>
        <div className='background-masker background-masker-competition-2'/>
      </div>
    </div>
    <div className={"col-md-6"}>
      <div className={"preloader-poster animated-background"}>
        <div className='background-masker background-masker-competition-1'/>
        <div className='background-masker background-masker-competition-2'/>
      </div>
    </div>
    <div className={"col-md-6"}>
      <div className={"preloader-meta animated-background"}>
        <div className='background-masker background-masker-competition-1'/>
        <div className='background-masker background-masker-competition-2'/>
        <div className='background-masker background-masker-competition-3'/>
      </div>
    </div>
  </Preloader>
)

export default CompetitionDetailPreloader
