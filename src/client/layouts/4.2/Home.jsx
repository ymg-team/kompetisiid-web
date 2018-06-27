import React, { Component } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/headers/Header'
import { Link } from 'react-router-dom'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { queryToObj } from 'string-manager'

class LayoutHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      q: this.props.location.search
        ? queryToObj(this.props.location.search.replace('?', '')).q
        : ''
    }
  }

  componentDidMount() {
    const q = this.props.location.search
      ? queryToObj(this.props.location.search.replace('?', '')).q
      : ''
    if (q) this.setState({ q })
  }

  render() {
    const { fullscreen } = matchRoutes(
      this.props.route.routes,
      this.props.location.pathname
    )[0].route
    const { q } = this.state
    return (
      <div>
        {!fullscreen ? (
          <Header q={q} setState={obj => this.setState(obj)} />
        ) : null}
        {renderRoutes(this.props.route.routes)}
        {!fullscreen ? <Footer /> : null}
      </div>
    )
  }
}

export default LayoutHome
