import React, { Component } from 'react'
import RedirectCom from '../components/Redirect'

export default class Redirect extends Component {
  constructor(props) {
    super(props)
    const query = queryToObj(this.props.location.search.replace('?', ''))
    this.state = {
      to: query.to
    }
  }

  componentDidMount() {
    if (!this.state.to) this.props.history.push('/')
  }

  render() {
    if (this.state.to) {
      return <RedirectCom url={this.state.to} />
    } else {
      return null
    }
  }
}

function queryToObj(a) {
  try {
    var b = {}
    return (
      a.split('&').map(function(a) {
        ;(a = a.split(/=(.+)/)), (b[a[0]] = a[1])
      }),
      b
    )
  } catch (a) {
    console.error(a)
  }
}
