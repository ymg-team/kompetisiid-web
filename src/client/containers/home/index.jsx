// components
import React, { Component } from 'react'
import SubHeader from '../../components/headers/HomeSubHeader'
import SubHeaderTitle from '../../components/headers/SubHeader'
import Helmet from '../../components/Helmet'
import CompetitionBox from '../../components/boxs/CompetitionBox'
import NewsBox from '../../components/boxs/NewsBox'
import MediapartnerBox from '../../components/boxs/MediapartnerBox'
import { Link } from 'react-router-dom'

// modules
import Styled from 'styled-components'
import * as Colors from '../../../style/colors'
import { connect } from 'react-redux'
import { topLoading } from '../../components/preloaders'
import { getStorage, setStorage } from '../../../store/helpers/LocalStorage'
import {
  fetchJelajah,
  getCategories,
  setCategories,
  getStats
} from '../competition/actions'
import { fetchBerita } from '../../../store/berita/actions'

const GrayBackgroundStyled = Styled.div`
  padding: 30px;
  background: ${Colors.softGray};
`

class Home extends Component {
  componentDidMount() {
    window.scroll(0, 0)

    if (!this.props.kompetisi.data.home_latest)
      this.props.dispatch(fetchJelajah({ limit: 9 }, 'home_latest'))

    if (!this.props.kompetisi.data.home_popular) topLoading(true)
    this.props.dispatch(fetchJelajah({ limit: 4, popular: 1 }, 'home_popular'))

    if (!this.props.kompetisi.data.home_mediapartner)
      this.props.dispatch(
        fetchJelajah({ limit: 4, mediapartner: 1 }, 'home_mediapartner')
      )

    if (!this.props.berita.data.home_latest)
      this.props.dispatch(fetchBerita({ limit: 6 }, 'home_latest'))

    this.reqCategories()
    this.props.dispatch(getStats())
  }

  componentWillReceiveProps(np) {
    if (
      np.kompetisi.categories.meta &&
      np.kompetisi.categories.meta.code == 200
    ) {
      // save categories to local storage
      setStorage('categories', JSON.stringify(np.kompetisi.categories))
    }
  }

  reqCategories() {
    const Categories = getStorage('categories')
    if (Categories) {
      this.props.dispatch(setCategories(JSON.parse(Categories)))
    } else {
      this.props.dispatch(getCategories())
    }
  }

  render() {
    const { kompetisi, berita } = this.props

    if (
      typeof window !== 'undefined' &&
      kompetisi.data['home_popular'] &&
      kompetisi.data['home_popular'].meta
    ) {
      topLoading(false)
    }

    return (
      <div>
        <Helmet />
        {/* slider */}
        <SubHeader
          stats={kompetisi.stats || {}}
          slider={kompetisi.data['home_popular'] || {}}
        />

        {/* competition */}
        <div className="col-md-12 bg-white">
          <SubHeaderTitle
            title="Kompetisi Baru"
            text="Ikuti beragam kompetisi disini sesuai dengan minat kamu."
          />
        </div>
        <GrayBackgroundStyled className="col-md-12">
          <CompetitionBox subtitle={false} {...kompetisi.data['home_latest']} />
          <div className="row align-center">
            <Link className="btn btn-bordergray" to="/browse">
              JELAJAH KOMPETISI
            </Link>
          </div>
        </GrayBackgroundStyled>

        {/* news */}
        <div className="col-md-12 bg-white">
          <SubHeaderTitle
            title="Kabar Baru"
            text="Update dengan kabar baru seputar kompetisi di Indonesia."
          />
        </div>
        <GrayBackgroundStyled className="col-md-12">
          <NewsBox subtitle={false} {...berita.data['home_latest']} />
          <div className="row align-center">
            <Link className="btn btn-bordergray" to="/browse">
              BERITA BERIKUTNYA
            </Link>
          </div>
        </GrayBackgroundStyled>

        {/* media partner */}
        <MediapartnerBox {...kompetisi.data['home_mediapartner']} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
