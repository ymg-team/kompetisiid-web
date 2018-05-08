import React from 'react'
import Styled from "styled-components"

const Preloader = Styled.div`
  height: 100vh;
  
  .preloader-author.animated-background {
    width: 280px;
    margin-top: 50px;
    margin-bottom: 20px;
    height: 50px;
    
    .background-masker-1 {
      height: 50px;
      left: 60px;
      width: 10px;
    }
    .background-masker-2 {
      top: 20px;
      height: 10px;
      left: 60px;
      width: 220px;
    }
  }
  
  .preloader-title.animated-background {
    height: 50px;
    margin-bottom: 20px;
  }
  
  .preloader-meta.animated-background {
    height: 30px;
    margin-bottom: 20px;
    
    .background-masker-1 {
      height: 30px;
      left: 100px;
      width: calc(100% - 100px);
    }
  }
  
`

const NewsDetailPreloader = props => (
  <Preloader className={"container"}>
    <div className={"col-md-12"}>
      <div className={"preloader-author animated-background"}>
        <div className='background-masker background-masker-1'/>
        <div className='background-masker background-masker-2'/>
      </div>
    </div>
    <div className={"col-md-12"}>
      <div className={"preloader-title animated-background"} />
    </div>
    <div className={"col-md-12"}>
      <div className={"preloader-meta animated-background"}>
        <div className='background-masker background-masker-1'/>
      </div>
    </div>
  </Preloader>
)

export default NewsDetailPreloader
