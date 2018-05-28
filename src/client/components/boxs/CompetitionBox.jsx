import React from 'react'
import Card from '../cards/CompetitionListCard'
import Loader from '../preloaders/CompetitionCardLoader'
import Transition from 'react-transition-group/Transition'
import { duration, style } from '../Transtition'

function generateList(size, n) {
  return n.map((n, key) => <Card size={size} key={key} n={n} />)
}

const CompetitionBox = props => {
  let { data, status, message, is_loading, subtitle, size, count, meta } = props
  if (typeof subtitle == 'undefined') subtitle = true
  if (typeof size == 'undefined') size = 'large'

  return (
    <div id="competition-container">
      <div className="container">
        <div className="row no-margin">

          {/* header total show competition */}
          {status && status === 200 && subtitle ? (
            <span style={{ display: 'table' }}>
              <br />
              menampilkan <strong> {data.length || 0}</strong> dari{' '}
              <strong>{count > 5000 ? 'beberapa' : count}</strong> kompetisi
              <br />
            </span>
          ) : null}
          {subtitle ? <div className="row m-10" /> : null}
          {/* end of header total show competition */}
          
          {/* competition literation */}
          <Transition in={status && status > 0} timeout={duration}>
            {state => (
              <div
                className="row"
                style={Object.assign({}, style.fade.default, style.fade[state])}
              >
                {status ? (
                  !data ? (
                    <p className="text-muted">{message}</p>
                  ) : (
                    generateList(size, data)
                  )
                ) : null}
              </div>
            )}
          </Transition>
          {/* end of competition literation */}

          {is_loading || !status ? (
            <Loader size={props.size} total={props.total} />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default CompetitionBox
