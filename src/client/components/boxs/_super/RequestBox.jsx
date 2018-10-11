import React, { Component } from 'react'
import List from '../../rows/_super/RequestRow'
import Loading from '../../preloaders/GlobalLoader'

let Limit = 20

class RequestBox extends Component {
  render() {
    const { data } = this.props

    return (
      <div>
        {data && data.is_loading ? (
          <div className="row">
            <Loading />
          </div>
        ) : null}

        {data && data.status ? (
          <div className="p-b-50">

            {/* data count status */}
            {data.data && data.status === 200 ? (
              <p>
                Menampilkan <strong>{data.data.length}</strong> dari{' '}
                <strong>{data.count}</strong> request
              </p>
            ) : null}

            {/* rows literation */}
            {data.data
              ? data.data.map((n, key) => {
                return <List key={key} {...n} />
              })
              : null}

            {/* print message from api */}
            {data.status !== 200 ? (
              <div className="muted align-center">{data.message}</div>
            ) : null}

            {/* button loadmore */}
            {data.data && data.status === 200 ? (
              <div className="align-center">
                <a className="btn btn-white">
                  Request berikutnya <i className="fa fa-angle-down" />
                </a>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    )
  }
}

export default RequestBox
