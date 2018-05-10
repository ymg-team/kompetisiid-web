import React from 'react'
import Styled from 'styled-components'
import { today } from '../../helpers/DateTime'

const HomeCountStyled = Styled.div`
  padding: 2.5em 0;
  .home-count-item {
    line-height: 1.1;
    text-align: center;
    .home-count-text-large {
      font-size: 2em;
      font-weight: bold
    }
    .home-count-text-small{
      font-size: 1.3em;
      color: $color-gray-soft;
    }
  }
`

export default props => {
  if (props.data) {
    return (
      <HomeCountStyled className="col-md-6 col-md-offset-3 home-count">
        <div>
          <div className="col-sm-4 col-xs-4 home-count-item">
            <div className="home-count-text-large">
              {props.data.totalcompetition}
            </div>
            <div className="home-count-text-small text-gray">
              Kompetisi Aktif
            </div>
          </div>
          <div className="col-sm-4 col-xs-4 home-count-item">
            <div className="home-count-text-large">
              {props.data.totalthismounth}
            </div>
            <div className="home-count-text-small text-gray">
              Deadline Bulan ini
            </div>
          </div>
          <div className="col-sm-4 col-xs-4 home-count-item">
            <div className="home-count-text-large">{props.data.totalprize}</div>
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
