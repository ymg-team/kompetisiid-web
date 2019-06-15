// deps
import React, { Component } from "react"
import Loadable from "react-loadable"
import Styled from "styled-components"
import { connect } from "react-redux"
import { topLoading } from "../../components/preloaders"
import { getStorage, setStorage } from "../../../store/helpers/LocalStorage"
import { LOCAL_STORAGE_CATEGORIES } from "../../../config/version"

// components
import EmptyLoading from "../../components/preloaders/EmptyLoader"
import Loading from "../../components/preloaders/GlobalLoader"
import Helmet from "../../components/Helmet"
import NewsLoading from "../../components/preloaders/NewsCardLoader"
import CompetitionLoading from "../../components/preloaders/CompetitionCardLoader"
import { Link } from "react-router-dom"
import Navbar from "../../components/navigations/TransparentNavbar"
import SubHeaderHome from "../../components/headers/HomeSubHeader"

// split components
const NewsBox = Loadable({
  loader: () => import("../../components/boxs/NewsBox"),
  loading: () => <NewsLoading withContainer />
})
const CompetitionBox = Loadable({
  loader: () => import("../../components/boxs/CompetitionBox"),
  loading: () => <CompetitionLoading withContainer />
})
const MediapartnerBox = Loadable({
  loader: () => import("../../components/boxs/MediapartnerBox"),
  loading: Loading
})
const SubHeaderTitle = Loadable({
  loader: () => import("../../components/headers/SubHeader"),
  loading: EmptyLoading
})
const MediaPartner = Loadable({
  loader: () => import("../../components/cards/MediaPartner"),
  loading: EmptyLoading
})

// actions and store
import * as Colors from "../../../style/colors"
import {
  fetchJelajah,
  getCategories,
  setCategories
} from "../competition/actions"
import { getStats } from "../user/actions"
import { fetchBerita } from "../news/actions"

const GrayBackgroundStyled = Styled.div`
  padding: 30px 0;
  /* background: ${Colors.softGray}; */
`

class Home extends Component {
  componentDidMount() {
    window.scroll(0, 0)

    // get lattest 9 active competition
    if (!this.props.kompetisi.data.home_latest)
      this.props.dispatch(
        fetchJelajah({ limit: 9, status: "active" }, "home_latest")
      )

    // get lattest 7 active and popular competition
    if (!this.props.kompetisi.data.home_popular) topLoading(true)
    this.props.dispatch(
      fetchJelajah(
        { limit: 7, is_popular: true, status: "active" },
        "home_popular"
      )
    )

    // get lattest 7 media partner
    if (!this.props.kompetisi.data.home_mediapartner)
      this.props.dispatch(
        fetchJelajah({ limit: 7, is_mediapartner: true }, "home_mediapartner")
      )

    // get lattest 6 news
    if (!this.props.berita.data.home_latest)
      this.props.dispatch(fetchBerita({ limit: 6 }, "home_latest"))

    this.reqCategories()
    this.props.dispatch(getStats())
  }

  UNSAFE_componentWillReceiveProps(np) {
    if (
      np.kompetisi.categories.status &&
      np.kompetisi.categories.status == 200
    ) {
      // save categories to local storage
      setStorage(
        LOCAL_STORAGE_CATEGORIES,
        JSON.stringify(np.kompetisi.categories)
      )
    }
  }

  reqCategories() {
    const Categories = getStorage(LOCAL_STORAGE_CATEGORIES)
    if (Categories) {
      this.props.dispatch(setCategories(JSON.parse(Categories)))
    } else {
      this.props.dispatch(getCategories())
    }
  }

  render() {
    const { kompetisi, berita } = this.props

    if (
      typeof window !== "undefined" &&
      kompetisi.data["home_popular"] &&
      kompetisi.data["home_popular"].meta
    ) {
      topLoading(false)
    }

    return (
      <React.Fragment>
        <Helmet />

        {/* navbar */}
        {/* special background image */}
        <div className="bg-gray">
          {/* navbar */}
          <Navbar className="bg-gray" location={this.props.location} />
          {/* slider */}
        </div>

        <div className="col-md-12">
          <SubHeaderHome
            stats={kompetisi.stats || {}}
            slider={kompetisi.data["home_popular"] || {}}
          />
        </div>

        {/* competition */}
        <div className="col-md-12 bg-gray">
          <SubHeaderTitle
            title="Kompetisi Baru"
            text="Ikuti beragam kompetisi disini sesuai dengan minat kamu."
          />
        </div>

        {/* media partners ads */}
        <div className="container">
          <div className="col-md-12">
            <MediaPartner />
          </div>
        </div>

        <GrayBackgroundStyled className="col-md-12">
          <CompetitionBox subtitle={false} {...kompetisi.data["home_latest"]} />

          <div className="row align-center">
            <Link className="btn btn-bordergray" to="/browse">
              JELAJAH KOMPETISI
            </Link>
          </div>
        </GrayBackgroundStyled>

        {/* news */}
        <div className="col-md-12 bg-gray">
          <SubHeaderTitle
            title="Kabar Baru"
            text="Update dengan kabar baru seputar kompetisi di Indonesia."
          />
        </div>
        <GrayBackgroundStyled className="col-md-12">
          <NewsBox subtitle={false} {...berita.data["home_latest"]} />
          <div className="row align-center">
            <Link className="btn btn-bordergray" to="/news">
              KABAR BERIKUTNYA
            </Link>
          </div>
        </GrayBackgroundStyled>

        {/* media partner */}
        <MediapartnerBox {...kompetisi.data["home_mediapartner"]} />
      </React.Fragment>
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

export default connect(mapStateToProps)(Home)
