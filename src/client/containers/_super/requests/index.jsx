import React, { Component } from 'react'
import HeaderDashboard from '../../../components/cards/HeaderDashboard'
import Tab from '../../../components/navigations/Tab'
import Loader from '../../../components/preloaders/GlobalLoader'
import Helmet from '../../../components/Helmet'

import { fetchRequest } from './actions'
import { connect } from 'react-redux'

let Filter, Params
let Limit = 20

class RequestCompetition extends Component {

  componentDidMount(){
    const filter = this.generateFilter(this.props)
    const params = this.generateParams(this.props)
    this.props.dispatch(fetchRequest(params, filter))
  }

  generateFilter(props) {
    Filter = `request_${props.route.status}`
    return Filter
  }

  generateParams(props){
    Params = {
      status: props.route.status
    }

    return Params
  }

  render() {
    const { status } = this.props.route
    const { data } = this.props
    const tabcontent = [
      {
        text: 'menunggu',
        is_active: status === 'waiting',
        count: 7,
        target: '/super/requests/waiting'
      },
      {
        text: 'diterima',
        is_active: status == 'posted',
        count: 12,
        target: '/super/requests/posted'
      },
      {
        text: 'ditolak',
        is_active: status === 'reject',
        count: 12,
        target: '/super/requests/reject'
      }
    ]

    const title = 'Request Kompetisi dari Publik'
    const description = 'Halaman ini digunakan untuk validasi request beberapa kompetisi yang telah dipasang publik melalui alamat https://kompetisi.id/add/send'

    return (
      <div>
        <Helmet title={title} description={description} />

        <HeaderDashboard
          title={title}
          text={description}
        />
        
        <Tab tabs={tabcontent} />
        
        {data[Filter] && data[Filter].is_loading ? (
          <div className="row">
            <Loader />
          </div>
        ) : null}
        
        {data[Filter] && data[Filter].status ? (
          <div className="p-b-50">
            {data[Filter].status === 200 ? (
              <p>
                Menampilkan <strong>{data[Filter].data.length}</strong> dari{' '}
                <strong>{data[Filter].data.count}</strong> request
              </p>
            ) : null}


            {data[Filter].status === 200 ? (
              data[Filter].data.map((n, key) => {
                return <p>{key}</p>
              })
            ) : (
              <p className="text-muted">{data[Filter].message}</p>
            )}


            {data[Filter].status === 200 ? (
              <span>
                <a className="btn btn-white">
                  <i className="fa fa-angle-left">&nbsp;</i>sebelumnya{' '}
                </a>
                {data[Filter].data.length >= Limit ? (
                  <a className="btn btn-white">
                    berikutnya <i className="fa fa-angle-right" />
                  </a>
                ) : null}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    )
  }
}

function generateFilter(props) {
  const { status } = props.route
  return `status`
}

function generateParams(props) {
  const { tab_active } = props.route
  let Params = {
    limit: Limit,
    username: props.session.username
  }
  Params.status = status

  return Params
}

function mapStateToProps(state) {
  const { User, Request } = state
  return {
    session: User.session.data,
    data: Request
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestCompetition)
