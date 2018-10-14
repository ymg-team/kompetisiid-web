/**
 * Created by yussan on 04/02/17.
 */
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Loader from '../components/spiner/Circle'

import { alert } from '../components/Alert'
import { connect } from 'react-redux'
import { emailVerification } from './user/actions'

class EmailVerify extends Component {
  componentDidMount() {
    const { token } = this.props.location.query
    this.props.dispatch(emailVerification(token))
  }

  UNSAFE_componentWillReceiveProps(np) {
    if (np.email_verification.meta) {
      this.setState(
        {
          onprogress: false
        },
        () => {
          if (np.email_verification.meta.code === 201) {
            setTimeout(() => {
              alert(false)
              window.location.href = '/'
            }, 1500)
            alert(true, np.email_verification.meta.message, 'success', false)
          } else {
            alert(true, np.email_verification.meta.message, 'error', false)
          }
        }
      )
    }
  }

  render() {
    return (
      <div className="text-center">
        <Helmet title="Email verification..." />
        <Loader />sedang verifikasi email..
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    email_verification: state.User.email_verification
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EmailVerify)
