import React from 'react'
import Styled from 'styled-components'
import { today } from '../../helpers/dateTime'

const HomeCountStyled = Styled.div`
  padding: 20px 0 40px;
  display: inline-block;
  .home-count-item {
    line-height: 1.1;
    text-align: center;
    .home-count-text-large {
      font-size: 1.5em;
      font-weight: bold;
    }
    .home-count-text-small{
      font-size: 1em;
      color: $color-gray-soft;
    }
  }

  /* small */
  /* @media only screen and (max-width: 543px) {
    .home-count-item {
      margin-bottom: 2em;
    }
  }

  /* medium screen */
  @media only screen and (min-width: 544px) and (max-width: 767px) {
    .home-count-item {
      margin-bottom: 2em;
    }
  } */
`

export default props => {
  if (props.status == 200) {
    return (
      <HomeCountStyled className="col-md-6 col-md-offset-3 home-count">
        <div>
          <div className="col-sm-4 col-xs-4 home-count-item">
            <div className="home-count-text-large">
              {props.activeCompetition}
            </div>
            <div className="home-count-text-small text-gray">
              Kompetisi Aktif
            </div>
          </div>
          <div className="col-sm-4 col-xs-4 home-count-item">
            <div className="home-count-text-large">
              {props.deadlineThisMonth}
            </div>
            <div className="home-count-text-small text-gray">
              Deadline Bulan ini
            </div>
          </div>
          <div className="col-sm-4 col-xs-4 home-count-item">
            <div className="home-count-text-large">{props.totalPrizeActiveCompetition}</div>
            <div className="home-count-text-small text-gray">
              Nilai Total Hadiah
            </div>
          </div>
        </div>
      </HomeCountStyled>
    )
  }

  return null
}
