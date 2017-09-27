import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from '../../components/Helmet'
import CompetitionBox from '../../components/4.2/boxs/CompetitionBox'

import * as KompetisiActions from '../../../store/kompetisi/actions'
import {getStorage, setStorage} from '../../../store/helpers/LocalStorage'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

let handleScroll

class BrowseCompetition extends Component 
{
  static fetchData({store, params, query})
  {
      const State = generateState(query, params)
      const Filter = generateFilter(State)
      const Params = generateParams(State)
      return store.dispatch(KompetisiActions.fetchJelajah(Params, Filter))
  }

  constructor(props)
  {
      super(props)
      this.state = generateState(this.props.location.query, this.props.params)
  }

  componentDidMount()
  {
    window.scrollTo(0,0)
    this.reqData()
    const Categories = getStorage('categories')
    if(Categories)
    {
        this.props.dispatch(KompetisiActions.setCategories(JSON.parse(Categories)))
    }else 
    {
        this.props.dispatch(KompetisiActions.getCategories())
    }
    //scroll event listener
    window.addEventListener('scroll', (e) => this.handleScroll(e), true)    
  }

  componentWillReceiveProps(np)
  {
    this.setState(Object.assign(generateState(np.location.query, np.params), setCategories(np, this.state)), () => {
        this.reqData()
    })
  }

  componentWillUnmount()
  {
    window.removeEventListener('scroll', (e) => this.handleScroll(e), true)
  }

  handleScroll(e)
  {
    if(document.getElementById('competition-container'))
    {
        const ContainerHeight = document.getElementById('competition-container').offsetHeight
        if(window.pageYOffset >= ContainerHeight - 600) this.reqMore()
    }
  }

  reqData()
  {
      const Filter = generateFilter(this.state)
      const Params = generateParams(this.state, this.props)
      if(!this.props.kompetisi.data[Filter])
      {
          this.props.dispatch(KompetisiActions.fetchJelajah(Params, Filter))
      }
  }

  reqMore()
  {
      const Filter = generateFilter(this.state)
      const Params = generateParams(this.state, this.props)
      const Kompetisi = this.props.kompetisi.data[Filter] ? this.props.kompetisi.data[Filter].data : null
      if(Kompetisi)
      {
          if(!this.props.kompetisi.data[Filter].is_loading && this.props.kompetisi.data[Filter].meta.code === 200)
          {
              Params.lastid = Kompetisi[Kompetisi.length - 1].id_kompetisi
              this.props.actions.getJelajahMore(Params, Filter)
          }
      }
  }

  render()
  {
    const {tag, username, main_kat, sub_kat, q} = this.state
    const {data, categories} = this.props.kompetisi
    const filter = generateFilter(this.state)
    let title= 'Jelajah - Kompetisi Indonesia'
    let description = 'Jelajahi kompetisi dari berbagai macam kategori di Kompetisi Indonesia'
    
    //jelajah kompetisi by tag
    if(tag) {
        title = `Jelajah - Tag : ${tag}`
        description = `Jelajahi kompetisi berdasarkan tag ${tag}`
    }

    //jelajah kompetisi by username
    if(username) {
        title = `Kompetisi dipasang oleh ${username}`
        description = `Jelajahi kompetisi yang dipasang oleh ${username}`
    }

    return(
      <div>
        <Helmet
            title={title}
            meta={[
                {'name': 'description', 'content': description},
                {'property': 'og:title', 'content': title},
                {'property': 'og:url', 'content': 'http://kompetisiindonesia.com/jelajah'},
                {'property': 'og:image', 'content': 'http://kompetisiindonesia.com/assets/images/wide-red-logo.png'},
                {'property': 'og:description', 'content': description},
                {'property': 'og:type', 'content': 'article'},
            ]}
        />

        {/*filter*/}
        <div className='col-md-12 filter-jelajah'>
          <div className='container'>
            <div className='row no-margin'>
              <h1> Jelajah 
                {' '}
                <a href='javascript:;' onClick={() => modal('open', 'select-main-kat')}>
                  {parseInt(main_kat) >= 0 ? categories.data[main_kat].main_kat : 'Semua kategori'}
                  <i className='fa fa-angle-down' />
                </a>
                {
                  parseInt(main_kat) >= 0 ?
                    <span>
                      {' '}dan{' '}
                      <a href='javascript:;' onClick={() => modal('open', 'select-sub-kat')}>
                        {parseInt(sub_kat) >= 0 ? categories.data[main_kat].subkat[sub_kat].sub_kat : 'Semua subkategori'}
                        <i className='fa fa-angle-down' />
                      </a>
                    </span>
                  : null
                }       
              </h1>
            </div>
            <div className='row no-margin'>
              <h1>
                Sort by <a href='javascript:;'>Terbaru<i className='fa fa-angle-down' /></a>
                { tag ? ` Tag "${tag}"` : ''}    
                {q ? ` Pencarian "${q}"` : ''}    
              </h1></div>
            <div className='row no-margin'>
              <p className='text-muted'>Gunakan filter ini untuk menemukan kompetisi yang sesuai dengan minat kamu</p>
            </div>
          </div>
        </div>
        {/*end of filter*/}

        {/*content*/}
        <CompetitionBox subtitle={true}  {...data[filter]} />
        {/*end of content*/}

        {/*modal*/}
        <div>
          <div className='modal' id='select-main-kat'>
            <div className='container'>
              <h2 className='modal-title'>Pilih Kategori dibawah ini</h2><a className='btn btn-white btn-close-modal btn-sm fa fa-close' />
              <hr />
              {
                categories.meta && categories.meta.code == 200 ?
                  <ul className='vertical-menu list-categories'>
                    <li><a href='javascript:;' onClick={() => this.setState({main_kat: ''}, () => {modal('close', 'select-main-kat')})} className='text-muted'>semua kategori</a></li>
                    {categories.data.map((n, key) => {
                      return <li key={key}>
                        <a 
                          href='javascript:;' 
                          onClick={() => {
                              modal('close', 'select-main-kat')
                              this.context.router.push(`/browse/${n.main_kat}`)
                          }} 
                          className='text-muted'>{n.main_kat}</a>
                      </li>
                    })}                    
                  </ul>
                : 'loading...'
              }             
            </div>
          </div>
          <div className='modal' id='select-sub-kat'>
            <div className='container'>
              <h2 className='modal-title'>Pilih sub kategori dibawah ini</h2><a className='btn btn-white btn-close-modal btn-sm'><i className='fa fa-close' /></a>
              <hr />
              <ul className='vertical-menu list-categories'>
                <li><a href='javascript:;' onClick={() => this.setState({sub_kat: ''}, () => {modal('close', 'select-sub-kat')})} className='text-muted'>Semua subkategori</a></li>
                {
                    parseInt(main_kat) >= 0 ?
                        categories.data[main_kat].subkat.map((n, key) => {
                            return  <li key={key}>
                            <a 
                            href='javascript:;' 
                            onClick={() => {
                                modal('close', 'select-sub-kat')
                                this.context.router.push(`/browse/${categories.data[main_kat].main_kat}/${n.sub_kat}`)
                            }}
                            className='text-muted'>{n.sub_kat}</a>
                        </li>
                        })
                    : null                    
                }
              </ul>
            </div>
          </div>
        </div>
        {/*end of modal*/}

      </div>
    )
  }
}

function setCategories(props, state)
{
    let main_kat, sub_kat
    if(props.kompetisi.categories.meta)
    {
        if(props.params.mainkat)
        {
            props.kompetisi.categories.data.map((n, key) => {
                if(n.main_kat === props.params.mainkat) main_kat = key
            })
        }else 
        {
            main_kat = ''
        }

        if(props.params.subkat && props.kompetisi.categories.data[main_kat].subkat )
        {
            props.kompetisi.categories.data[main_kat].subkat.map((n, key) => {
                if(n.sub_kat === props.params.subkat) sub_kat = key
            })
        }else 
        {
            sub_kat = ''
        }
    }
    return {
        main_kat,
        sub_kat
    }
}

function generateState(query, params)
{
    const {tag, username} = params
    const {mediapartner, berakhir, garansi, q} = query

    return {
        main_kat: '',
        sub_kat: '',
        q: q || '',
        tag: tag || '',
        username: username || '',
        is_mediapartner: mediapartner && mediapartner == 1,
        is_berakhir: berakhir && berakhir == 1,
        is_garansi: garansi && garansi == 1
    }
}

function generateParams(n, props = null)
{
    const {main_kat, sub_kat, is_mediapartner, is_berakhir, q, tag, username, is_garansi} = n
    let Params = {}
    if(props)
    {
        const {categories} = props.kompetisi
        if(parseInt(main_kat) >= 0) Params.mainkat = categories.data[main_kat].main_kat
        if(parseInt(sub_kat) >= 0) Params.subkat = categories.data[main_kat].subkat[sub_kat].sub_kat
    }
    if(q && q != '') Params.q = q
    if(username && username != '') Params.username = username
    if(tag && tag != '') Params.tag = tag
    if(is_mediapartner) Params.mediapartner = 1
    if(is_berakhir) Params.berakhir = 1
    if(is_garansi) Params.garansi = 1
    Params.limit = 9

    return Params
}

function generateFilter(n)
{
    const {main_kat, sub_kat, is_mediapartner, is_berakhir, q, tag, is_garansi} = n
    let Filter = 'jelajah'
    if(parseInt(main_kat) >= 0) Filter = `${Filter}_${main_kat}`
    if(parseInt(sub_kat) >= 0) Filter = `${Filter}_${sub_kat}`
    if(q != '') Filter = `${Filter}_${q}`
    if(tag != '') Filter = `${Filter}_${tag}`
    Filter = `${Filter}_${is_mediapartner}_${is_berakhir}_${is_garansi}`

    return Filter
}

function mapStateToProps(state)
{
    const {Kompetisi} = state

    return {
        kompetisi: Kompetisi
    }
}

function mapDispatchToProps(dispatch)
{
    return {
        actions: bindActionCreators(Object.assign({}, KompetisiActions), dispatch),
        dispatch
    }
}

BrowseCompetition.contextTypes = {
    router: PropTypes.func.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrowseCompetition)