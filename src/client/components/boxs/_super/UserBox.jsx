import React from "react"
import Loading from "../../preloaders/GlobalLoader"
import List from "../../rows/_super/UserRow"

const UserBox = props => {
  const { data } = props

  const handleLoadMore = () => {
    // get last if of requets
    const { data } = props.data || {}
    const lastid = data[data.length - 1].id
    // start to request more data
    props.handleLoadMore(lastid)
  }

  return (
    <React.Fragment>
      {data && data.status ? (
        <div className="p-b-50">
          {/* data count status */}
          {data.data && data.status === 200 ? (
            <p>
              Menampilkan <strong>{data.data.length}</strong> dari{" "}
              <strong>{data.count}</strong> request
            </p>
          ) : null}

          {/* rows literation */}
          {data.data
            ? data.data.map((n, key) => {
                return <List key={key} {...n} />
              })
            : null}

          {/* button loadmore */}
          {data.data && data.status === 200 && !data.is_loading ? (
            <div className="align-center">
              <a
                className="btn btn-white"
                href="#"
                onClick={e => {
                  e.preventDefault()
                  handleLoadMore()
                }}
              >
                User berikutnya <i className="fa fa-angle-down" />
              </a>
            </div>
          ) : null}

          {data && data.is_loading ? (
            <div className="row">
              <Loading />
            </div>
          ) : null}

          {/* print message from api */}
          {data.status !== 200 ? (
            <div className="muted align-center">{data.message}</div>
          ) : null}
        </div>
      ) : (
        <Loading />
      )}
    </React.Fragment>
  )
}

export default UserBox
