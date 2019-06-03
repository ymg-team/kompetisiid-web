import React, { Component } from "react"
import { renderRoutes, matchRoutes } from "react-router-config"
import { connect } from "react-redux"
import memoize from "memoize-one"
import { topLoading } from "../../components/preloaders"
import { toCamelCase } from "string-manager"

// components
import CompetitionPreloader from "../../components/preloaders/CompetitionDetail"
import { getDetail, getRelated } from "./actions"
import Error from "../../components/cards/ErrorCard"
class LayoutCompetition extends Component {
  // static fetchData({ params, store }) {
  //   return store.dispatch(getDetail(params.encid))
  // }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.reqData(this.props.match.params.encid)
    this.reqRelatedCompetitions(this.props.match.params.encid)
  }

  componentDidUpdate() {
    // on update route to other competition
    this.onUpdateRoute(this.props.match.params.encid)
  }

  onUpdateRoute = memoize(encid => {
    scrollTo(0, 0)
    this.reqData(encid)
    this.reqRelatedCompetitions(encid)
  })

  reqData(encid) {
    if (!this.props.kompetisi.detail[encid]) {
      topLoading(true)
      this.props.dispatch(getDetail(encid))
    }
  }

  reqRelatedCompetitions(encid) {
    if (!this.props.kompetisi.related[`related_${encid}`])
      this.props.dispatch(getRelated(encid, `related_${encid}`))
  }

  render() {
    const { encid } = this.props.match.params
    const { detail } = this.props.kompetisi

    if (typeof window !== "undefined" && detail[encid] && detail[encid].meta)
      topLoading(false)

    return (
      <div>
        {detail[encid] && detail[encid].status ? (
          detail[encid].status === 200 ? (
            renderRoutes(this.props.route.routes)
          ) : (
            <Error code={detail[encid].status == 204 ? 404 : detail[encid].status} message={detail[encid].message} />
          )
        ) : (
          <CompetitionPreloader />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutCompetition)
