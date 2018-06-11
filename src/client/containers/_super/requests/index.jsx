import React, { Component } from 'react'
import HeaderDashboard from '../../../components/cards/HeaderDashboard'
import Tab from '../../../components/navigations/Tab'
import CompetitionCard from '../../../components/cards/dashboard/CompetitionListCard'
import Loader from '../../../components/loaders/DefaultLoader'
import Helmet from '../../../components/Helmet'

import { fetchJelajah } from '../../competition/actions'
import { connect } from 'react-redux'

let Filter, Params
let Limit = 20

class MyCompetition extends Component {
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
        is_active: status == 'approved',
        count: 12,
        target: '/super/requests/approved'
      },
      {
        text: 'ditolak',
        is_active: status === 'rejected',
        count: 12,
        target: '/super/requests/rejected'
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
        
        {data[Filter] && data[Filter].meta ? (
          <div className="p-b-50">
            {data[Filter].meta.code == 200 ? (
              <p>
                Menampilkan <strong>{data[Filter].data.length}</strong> dari{' '}
                <strong>beberapa</strong> kompetisi
              </p>
            ) : null}
            {data[Filter].meta.code == 200 ? (
              data[Filter].data.map((n, key) => {
                return <CompetitionCard key={key} n={n} />
              })
            ) : (
              <p className="text-muted">{data[Filter].meta.message}</p>
            )}
            {data[Filter].meta.code == 200 ? (
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
  const { Kompetisi, User } = state
  return {
    data: Kompetisi.data,
    session: User.session.data
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
)(MyCompetition)
