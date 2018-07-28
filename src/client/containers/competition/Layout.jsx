import React, { Component } from 'react'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import memoize from 'memoize-one'
import { pushScript } from '../../helpers/DomEvents'
import { topLoading } from '../../components/preloaders'
import { toCamelCase } from 'string-manager'

// components
import Tab, { tab } from '../../components/navigations/TabCompetition'
import CompetitionPreloader from '../../components/preloaders/CompetitionDetail'
import { getDetail, getRelated } from './actions'
class LayoutCompetition extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(getDetail(params.encid))
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.reqData(this.props.match.params.encid)
    this.reqRelatedCompetitions(this.props.match.params.encid)
    pushScript('https://kompetisiindonesia.disqus.com/embed.js')
  }

  componentDidUpdate() {
    // on update route to other competition
    this.onUpdateRoute(this.props.match.params.encid)
  }

  onUpdateRoute = memoize(encid => {
    scrollTo(0,0)
    this.reqData(encid)
    this.reqRelatedCompetitions(encid)
  })

  reqData(encid) {
    // const { encid } = props.match.params
    if (!this.props.kompetisi.detail[encid]) {
      topLoading(true)
      this.props.dispatch(getDetail(encid))
    }
  }

  reqRelatedCompetitions(encid) {
    if (!this.props.kompetisi.data[`related_${encid}`])
      this.props.dispatch(getRelated(encid, `related_${encid}`))
  }

  render() {
    const { encid } = this.props.match.params
    const { detail, related, pengumuman } = this.props.kompetisi

    if (typeof window !== 'undefined' && detail[encid] && detail[encid].meta)
      topLoading(false)

    return (
      <div>
        {detail[encid] && detail[encid].status ? (
          detail[encid].status === 200 ? (
            renderRoutes(this.props.route.routes)
          ) : (
            <p>{detail[encid].message}</p>
          )
        ) : (
          <CompetitionPreloader />
        )}
      </div>
    )
  }
}

function generateJsonld(n, url) {
  const start_date = n.created_at.split(' ')
  const end_date = n.deadline_at.split(' ')
  return `{
    "@context": "http://schema.org",
    "@type": "Event",
    "name": "${n.title.replace(/\"/g, '')}",
    "description": "${n.sort.replace(/\"/g, '')}",
    "startDate": "${start_date[0]}T${start_date[1]}.000Z",
    "endDate": "${end_date[0]}T${end_date[1]}.000Z",
    "url": "${url}",
    "sameAs": "${n.sumber}",
    "image": {
        "@type": "ImageObject",
        "url": "${n.poster.original}",
        "height": "500",
        "width": "500"
    },
    "organizer": {
      "@type": "Organization",
      "name": "${n.penyelenggara}",
      "logo": {
          "@type": "ImageObject",
          "url": "https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/21529_1680281178877316_3989323526762937427_n.png?oh=30d4cacd082cb9b7bffbd9abf01c1cb0&oe=5A01639C",
          "height": "500",
          "width": "500"
      }
    },
    "location": {
      "@type": "Place",
      "name": "Indonesia",
      "address": "Indonesia"
    }
  }`
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutCompetition)
