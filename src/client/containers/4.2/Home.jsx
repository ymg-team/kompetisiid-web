import React, {Component} from 'react' 
import CompetitionBox from '../../components/4.2/boxs/CompetitionBox'
import MediapartnerBox from '../../components/4.2/boxs/MediapartnerBox'
import NewsBox from '../../components/4.2/boxs/NewsBox'
import HomeCategoriesBox from '../../components/4.2/boxs/CategoriesOnHome'
import Slider from '../../components/4.2/sliders/HomeSlider'
import Helmet from '../../components/Helmet'
import {Link} from 'react-router'

import {getStorage, setStorage} from '../../../store/helpers/LocalStorage'
import {fetchJelajah, getFavoritedTags, getCategories, setCategories} from '../../../store/kompetisi/actions'
import {fetchBerita} from '../../../store/berita/actions'
import {connect} from 'react-redux'

class Home extends Component 
{
  static fetchData({store})
  {
    // load latest competitions
    const getLatestC = store.dispatch(fetchJelajah({limit:6}, 'home_latest'))
    const getMediaPartnerC = store.dispatch(fetchJelajah({limit:4,mediapartner:1}, 'home_mediapartner'))
    const getPopularC = store.dispatch(fetchJelajah({limit:4, popular: 1}, 'home_popular'))
    const getB = store.dispatch(fetchBerita({limit:6}, 'home_latest'))
    
    return Promise.all([getMediaPartnerC, getLatestC,getPopularC, getB]);
  }

  componentDidMount()
  {
    // request data
    // this.props.dispatch(getFavoritedTags())

    if(!this.props.kompetisi.data.home_latest)
      this.props.dispatch(fetchJelajah({limit:6}, 'home_latest'))

    if(!this.props.kompetisi.data.home_popular)
      this.props.dispatch(fetchJelajah({limit:4,popular:1}, 'home_popular'))
    
    if(!this.props.kompetisi.data.home_mediapartner)
      this.props.dispatch(fetchJelajah({limit:4,mediapartner:1}, 'home_mediapartner'))
    
    if(!this.props.berita.data.home_latest)
      this.props.dispatch(fetchBerita({limit:6}, 'home_latest'))
    
    this.reqCategories()
  }

  reqCategories()
  {
    const Categories = getStorage('categories')
    if(Categories)
    {
        this.props.dispatch(setCategories(JSON.parse(Categories)))
    }else 
    {
        this.props.dispatch(getCategories())
    }
  }

  render()
  {
    const {kompetisi, berita} = this.props
    return(
      <div>
        <Helmet />
        <Slider />
        {/*main competition*/}
        {
          kompetisi.categories && kompetisi.categories.meta ? 
          <HomeCategoriesBox 
            kompetisi={kompetisi}
            fetchJelajah={(params, filter) => this.props.dispatch(fetchJelajah(params, filter))}
            categories={kompetisi.categories} />
          : null
        }
        {/*end of main competition*/}

        {/*popular competitions*/}
        <div className='col-md-12'>
          <div className='container'>
            <div className='row'>
              <div className='subtitle-more'>
                <h2 className='menu-title'>Kompetisi Populer</h2>
                <Link to={'/jelajah'} className='btn btn-white btn-sm'>Jelajah kompetisi</Link>
              </div>              
            </div>
          </div>
          <CompetitionBox 
            subtitle={false}
            size='small' 
            {...kompetisi.data['home_popular']} />
        </div>
        {/*end of popular competitions*/}

        {/*latest competitions*/}
        <div className='col-md-12'>
          <div className='container'>
            <div className='row'>
              <div className='subtitle-more'>
                <h2 className='menu-title'>Kompetisi Terbaru</h2>
                <Link to={'/jelajah'} className='btn btn-white btn-sm'>Jelajah kompetisi</Link>
              </div>
            </div>
          </div>
          <CompetitionBox 
            subtitle={false}
            {...kompetisi.data['home_latest']} />
        </div>
        {/*end of latest competitions*/}

        {/*news*/}
        <div className='col-md-12'>
          <div className='container'>
            <div className='row'>
              <div className='subtitle-more'>
                <h2 className='menu-title'>Berita Terbaru</h2>
                <Link to={'/jelajah'} className='btn btn-white btn-sm'>semua berita</Link>
              </div>
            </div>
          </div>
          <NewsBox 
            subtitle={false}
            {...berita.data['home_latest']} />
        </div>
        {/*end of news*/}

        {/*media partners*/}
        <MediapartnerBox
          {...kompetisi.data['home_mediapartner']}
         />
        {/*end of media partners*/}

      </div>
    )
  }
}

function mapStateToProps(state)
{
    const {Kompetisi, Berita} = state
    return {
        kompetisi: Kompetisi,
        berita: Berita
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

