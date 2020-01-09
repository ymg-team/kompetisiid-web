import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"

const ready = true

const Authorization = WrappedComponent => {
  class WithAuthorization extends Component {
    render() {
      // get userdata session
      if (ready) {
        // user is logged in
        return <WrappedComponent {...this.props} />
      } else {
        // user not logged in
        if(typeof window !== 'undefined') {
          // client rendering
          return <Redirect to='/login' />
        } else {
          // server rendering
          return <div>no access here</div>
        }
      }
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.Auth
    }
  }

  return connect(mapStateToProps)(WithAuthorization)
}

export default Authorization
