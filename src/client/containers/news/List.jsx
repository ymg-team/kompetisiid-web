import React, { Component } from "react"
import { fetchBerita, fetchBeritaMore } from "./actions"
import { connect } from "react-redux"
import Loadable from "react-loadable"

// components
import Subheader from "../../components/Subheader"
import NewsLoading from "../../components/preloaders/NewsCardLoader"
import EmptyLoading from "../../components/preloaders/EmptyLoader"
import Helmet from "../../components/Helmet"
import GAds from "../../components/cards/GoogleAds"

const Limit = 6
let AddedEventListener = false

const Newsbox = Loadable({
  loader: () => import("../../components/boxs/NewsBox"),
  loading: () => <NewsLoading style={{ marginTop: "20px" }} withContainer />
})

class List extends Component {
  // static fetchData({store})
  // {
  //     return store.dispatch(fetchBerita({ limit: Limit }, Filter))
  // }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.reqData(this.props)
    window.scrollTo(0, 0)
    if (!AddedEventListener) {
      AddedEventListener = true
      window.addEventListener("scroll", e => this.handleScroll(e), true)
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", e => this.handleScroll(e), true)
  }

  handleScroll() {
    if (document.getElementById("list-news")) {
      const ContainerHeight = document.getElementById("news-container")
        .offsetHeight
      if (window.pageYOffset >= ContainerHeight - 600) {
        this.reqMore()
      }
    }
  }

  reqData(props) {
    const Filter = this.generateFilter(props)
    let Params = { limit: Limit }
    Params.status = "published"

    // filter by tag
    if (props.match.params.tag) {
      Params.tag = this.props.match.params.tag
    }

    if (!this.props.berita.data[Filter])
      this.props.dispatch(fetchBerita(Params, Filter))
  }

  reqMore() {
    const Filter = this.generateFilter()
    let Params = { limit: Limit }
    Params.status = "published"
    // filter by tag
    if (this.props.match.params.tag) {
      Params.tag = this.props.match.params.tag
    }

    const Berita = this.props.berita.data[Filter]
    if (Berita && Berita.data) {
      Params.lastid = Berita.data[Berita.data.length - 1].id
      if (!Berita.is_loading && Berita.status === 200) {
        this.props.dispatch(fetchBeritaMore(Params, Filter))
      }
    }
  }

  generateFilter(props = this.props) {
    let Filter = "list"
    if (props.match.params.tag) {
      Filter += `_${this.props.match.params.tag}`
    }

    return Filter
  }

  render() {
    const Filter = this.generateFilter()
    let title = "Kabar Kompetisi"
    let description = "Kabar terbaru seputar kompetisi dari Kompetisi Id"

    if (this.props.match.params.tag) {
      title += ` berdasarkan tag "${this.props.match.params.tag}"`
      description += ` berdasarkan tag "${this.props.match.params.tag}"`
    }

    return (
      <div id="list-news">
        <Helmet title={title} description={description} />
        <Subheader title={title} desc={description} />
        {/* Google Ads */}
        <div className="col-md-12 align-center">
          <GAds
            adClient="ca-pub-4468477322781117"
            adSlot={1270681813}
            timeout={1000}
            style={{marginBottom: 10}}
          />
        </div>
        {/* end of Google Ads */}
        <Newsbox {...this.props.berita.data[Filter]} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { Berita } = state
  return {
    berita: Berita
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
)(List)
