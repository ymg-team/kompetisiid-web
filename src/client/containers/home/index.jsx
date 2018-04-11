// react components
import React, { Component } from "react"
import CompetitionBox from "../../components/4.2/boxs/CompetitionBox"
import MediapartnerBox from "../../components/4.2/boxs/MediapartnerBox"
import NewsBox from "../../components/4.2/boxs/NewsBox"
import Helmet from "../../components/Helmet"
import { Link } from "react-router-dom"
import StatsCount from "../../components/4.2/cards/HomeCount"
import Slider from "../../components/4.2/sliders/HomeSlider"
import Categories from "../../components/4.2/cards/HomeCategories"

// modules
import { getStorage, setStorage } from "../../../store/helpers/LocalStorage"
import {
  fetchJelajah,
  getCategories,
  setCategories,
  getStats
} from "../../../store/kompetisi/actions"
import { fetchBerita } from "../../../store/berita/actions"
import { connect } from "react-redux"

if(typeof window != 'undefined') require('./index.sass')

class Index extends Component {
  // static fetchData({store})
  // {
  //   // load latest competitions
  //   const getLatestC = store.dispatch(fetchJelajah({limit:9}, 'home_latest'))
  //   // const getMediaPartnerC = store.dispatch(fetchJelajah({limit:4,mediapartner:1}, 'home_mediapartner'))
  //   const getPopularC = store.dispatch(fetchJelajah({limit:4, popular: 1}, 'home_popular'))
  //   // const getB = store.dispatch(fetchBerita({limit:6}, 'home_latest'))
  //   const getS = store.dispatch(getStats())

  //   return Promise.all([getLatestC,getPopularC, getS])
  // }

  componentDidMount() {
    window.scroll(0, 0)

    if (!this.props.kompetisi.data.home_latest)
      this.props.dispatch(fetchJelajah({ limit: 9 }, "home_latest"))

    if (!this.props.kompetisi.data.home_popular)
      this.props.dispatch(
        fetchJelajah({ limit: 4, popular: 1 }, "home_popular")
      )

    if (!this.props.kompetisi.data.home_mediapartner)
      this.props.dispatch(
        fetchJelajah({ limit: 4, mediapartner: 1 }, "home_mediapartner")
      )

    if (!this.props.berita.data.home_latest)
      this.props.dispatch(fetchBerita({ limit: 6 }, "home_latest"))

    this.reqCategories()
    this.props.dispatch(getStats())
  }

  componentWillReceiveProps(np) {
    if (
      np.kompetisi.categories.meta &&
      np.kompetisi.categories.meta.code == 200
    ) {
      // save categories to local storage
      setStorage("categories", JSON.stringify(np.kompetisi.categories))
    }
  }

  reqCategories() {
    const Categories = getStorage("categories")
    if (Categories) {
      this.props.dispatch(setCategories(JSON.parse(Categories)))
    } else {
      this.props.dispatch(getCategories())
    }
  }

  render() {
    const { kompetisi, berita } = this.props
    return (
      <div>
        <Helmet />
        {/*competition stats  */}
        <StatsCount {...kompetisi.stats} />

        {/* popular competitions slider */}
        <Slider {...kompetisi.data["home_popular"]} />

        {/*categories  */}
        <Categories {...kompetisi.categories} />

        {/*latest competitions*/}
        <div className="col-md-12">
          <div className="container">
            <div className="row">
              <div className="subtitle-more">
                <h2 className="menu-title">Kompetisi Terbaru</h2>
                <Link to={"/browse"} className="btn btn-white btn-sm">
                  Jelajah kompetisi
                </Link>
              </div>
            </div>
          </div>
          <CompetitionBox subtitle={false} {...kompetisi.data["home_latest"]} />
        </div>
        {/*end of latest competitions*/}

        {/*news*/}
        <div className="col-md-12">
          <div className="container">
            <div className="row">
              <div className="subtitle-more">
                <h2 className="menu-title">Berita Terbaru</h2>
                <Link to={"/news"} className="btn btn-white btn-sm">
                  semua berita
                </Link>
              </div>
            </div>
          </div>
          <NewsBox subtitle={false} {...berita.data["home_latest"]} />
        </div>
        {/*end of news*/}

        {/*media partners*/}
        <MediapartnerBox {...kompetisi.data["home_mediapartner"]} />
        {/*end of media partners*/}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { Kompetisi, Berita } = state
  return {
    kompetisi: Kompetisi,
    berita: Berita
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
