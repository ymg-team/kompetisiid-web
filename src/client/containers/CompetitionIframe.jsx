import React, { Component } from 'react'
import Iframe from '../components/Iframe'
import Redirect from '../components/Redirect'
import Loader from '../components/loaders/DefaultLoader'

import { getDetail } from './competition/actions'
import { connect } from 'react-redux'
import { isHttps } from '../helpers/LinkGenerator'

class CompetitionIframe extends Component {
  // static fetchData({params, store})
  // {
  //     return store.dispatch(getDetail(params.encid))
  // }

  constructor(props) {
    super(props)
    let state = {}
    const { encid } = props.match.params
    const { iframe_type } = props.route
    const { kompetisi } = props
    if (
      kompetisi.detail[encid] &&
      kompetisi.detail[encid].meta &&
      kompetisi.detail[encid].meta.code == 200
    ) {
      state = {
        is_redirect: true
      }
    }

    this.state = state
  }

  componentWillReceiveProps(np) {
    const { encid } = np.match.params
    const { iframe_type } = np.route
    const { kompetisi } = np
    if (
      kompetisi.detail[encid] &&
      kompetisi.detail[encid].meta &&
      kompetisi.detail[encid].meta.code == 200
    ) {
      this.setState({
        is_redirect: true
      })
    }
  }

  componentDidMount(){
    this.props.dispatch(getDetail(this.props.match.params.encid))
  }

  render() {
    const { encid } = this.props.match.params
    const { iframe_type } = this.props.route
    const { is_redirect } = this.state
    const { kompetisi } = this.props
    return (
      <div>
        {typeof is_redirect != 'undefined' ? (
          is_redirect === false ? (
            <Iframe src={kompetisi.detail[encid].data[iframe_type]} />
          ) : (
            <Redirect url={kompetisi.detail[encid].data[iframe_type]} />
          )
        ) : (
          <Loader />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { Kompetisi } = state
  return {
    kompetisi: Kompetisi
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionIframe)
