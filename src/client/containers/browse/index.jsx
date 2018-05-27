import React, { Component } from 'react'
import Helmet from '../../components/Helmet'
import CompetitionLoading from '../../components/preloaders/CompetitionCardLoader'
import * as KompetisiActions from '../competition/actions'

import Loadable from 'react-loadable'
import { getStorage, setStorage } from '../../../store/helpers/LocalStorage'
import { queryToObj } from 'string-manager'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { topLoading } from '../../components/preloaders'

const CompetitionBox = Loadable({
  loader: () => import('../../components/boxs/CompetitionBox'),
  loading: CompetitionLoading
})

class Index extends Component {
  //   static fetchData({ store, params, query }) {
  //     const State = generateState(query, params)
  //     const Filter = generateFilter(State)
  //     const Params = generateParams(State)
  //     return store.dispatch(KompetisiActions.fetchJelajah(Params, Filter))
  //   }

  constructor(props) {
    super(props)
    this.state = generateState(
      this.props.location.search
        ? queryToObj(this.props.location.search.replace('?', ''))
        : {},
      this.props.match.params
    )
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.reqData()
    const Categories = getStorage('categories')
    if (Categories) {
      this.props.dispatch(
        KompetisiActions.setCategories(JSON.parse(Categories))
      )
    } else {
      this.props.dispatch(KompetisiActions.getCategories())
    }
    //scroll event listener
    window.addEventListener('scroll', e => this.handleScroll(e), true)
  }

  componentWillReceiveProps(np) {
    this.setState(
      Object.assign(
        generateState(
          np.location.search
            ? queryToObj(np.location.search.replace('?', ''))
            : {},
          np.match.params
        ),
        setCategories(np, this.state)
      ),
      () => {
        this.reqData()
      }
    )
  }

  componentWillUnmount() {
    console.log('remove scroll listener')
    window.removeEventListener('scroll', this.handleScroll)
    // window.onscroll = null
  }

  handleScroll(e) {
    if (document.getElementById('browse-container')) {
      const ContainerHeight = document.getElementById('competition-container')
        .offsetHeight
      if (window.pageYOffset >= ContainerHeight - 600) this.reqMore()
    }
  }

  reqData() {
    const Filter = generateFilter(this.state)
    const Params = generateParams(this.state, this.props)
    if (!this.props.kompetisi.data[Filter]) {
      topLoading(true)
      this.props.dispatch(KompetisiActions.fetchJelajah(Params, Filter))
    }
  }

  reqMore() {
    const Filter = generateFilter(this.state)
    const Params = generateParams(this.state, this.props)
    const Kompetisi = this.props.kompetisi.data[Filter]
      ? this.props.kompetisi.data[Filter].data
      : null
    if (Kompetisi) {
      if (
        !this.props.kompetisi.data[Filter].is_loading &&
        this.props.kompetisi.data[Filter].status === 200
      ) {
        Params.lastid = Kompetisi[Kompetisi.length - 1].id
        this.props.actions.getJelajahMore(Params, Filter)
      }
    }
  }

  render() {
    const { tag, username, main_kat, sub_kat, q } = this.state
    const { data, categories } = this.props.kompetisi
    const filter = generateFilter(this.state)
    const query = queryToObj(this.props.location.search.replace('?', '')) || {}

    let title = 'Jelajah Kompetisi'
    let description =
      'Jelajahi kompetisi dari berbagai macam kategori di Kompetisi Indonesia'

    // jelajah kompetisi by kategori
    if (main_kat) {
      title += ` di Kategori "${categories.data[main_kat].main_kat}"`
    }

    // jelajah kompetisi by sub kategori
    if (sub_kat) {
      title += ` Subkategori "${
        categories.data[main_kat].subkat[sub_kat].sub_kat
      }"`
    }

    //jelajah kompetisi by tag
    if (tag) {
      title += ` dengan Tag "${tag}"`
      description = `Jelajahi kompetisi berdasarkan tag ${tag}`
    }

    //jelajah kompetisi by username
    if (username) {
      title += ` Dipasang oleh "${username}"`
      description = `Jelajahi kompetisi yang dipasang oleh "${username}"`
    }

    // jelajah media partner
    if (query.mediapartner == 1) {
      title += ` Media Partner`
      description = `Jelajahi kompetisi yang menjadikan Kompetisi.id sebagai media partner`
    }

    if (typeof window !== 'undefined' && data[filter] && data[filter].meta) {
      topLoading(false)
    }

    return (
      <div id="browse-container">
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: description },
            { property: 'og:title', content: title },
            { property: 'og:url', content: 'http://kompetisi.id/browse' },
            {
              property: 'og:image',
              content: 'http://kompetisi.id/assets/images/wide-red-logo.png'
            },
            { property: 'og:description', content: description },
            { property: 'og:type', content: 'article' }
          ]}
        />

        {/*filter*/}
        <div className="col-md-12 filter-jelajah">
          <div className="container">
            <div className="row no-margin">
              <h1>
                {' '}
                Jelajah
                {query.mediapartner == 1 ? ' Media Partner' : ''}{' '}
                <a
                  href="javascript:;"
                  onClick={() => modal('open', 'select-main-kat')}
                >
                  {parseInt(main_kat) >= 0
                    ? categories.data[main_kat].main_kat
                    : 'Semua kategori'}
                  <i className="fa fa-angle-down" />
                </a>
                {parseInt(main_kat) >= 0 ? (
                  <span>
                    {' '}
                    dan{' '}
                    <a
                      href="javascript:;"
                      onClick={() => modal('open', 'select-sub-kat')}
                    >
                      {parseInt(sub_kat) >= 0
                        ? categories.data[main_kat].subkat[sub_kat].sub_kat
                        : 'Semua subkategori'}
                      <i className="fa fa-angle-down" />
                    </a>
                  </span>
                ) : null}
              </h1>
            </div>
            <div className="row no-margin">
              <h1>
                Sort by{' '}
                <a href="javascript:;">
                  Terbaru<i className="fa fa-angle-down" />
                </a>
                {tag ? ` Tag "${tag}"` : ''}
                {q ? ` Pencarian "${q}"` : ''}
              </h1>
            </div>
            <div className="row no-margin">
              <p className="text-muted">
                Gunakan filter ini untuk menemukan kompetisi yang sesuai dengan
                minat kamu
              </p>
            </div>
          </div>
        </div>
        {/*end of filter*/}

        {/*content*/}
        <CompetitionBox subtitle={true} {...data[filter]} />
        {/*end of content*/}

        {/*modal*/}
        <div>
          <div className="modal" id="select-main-kat">
            <div className="container">
              <div className="modal-title">
                Pilih Kategori dibawah ini
                <a
                  className="btn btn-white btn-close-modal btn-sm fa fa-close"
                  href="javascript:;"
                />
              </div>
              <hr />
              {categories.meta && categories.meta.code == 200 ? (
                <ul className="vertical-menu list-categories">
                  <li>
                    <a
                      href="javascript:;"
                      onClick={() =>
                        this.setState({ main_kat: '' }, () => {
                          modal('close', 'select-main-kat')
                          this.props.history.push('/browse')
                        })
                      }
                      className="text-muted"
                    >
                      semua kategori
                    </a>
                  </li>
                  {categories.data.map((n, key) => {
                    return (
                      <li key={key}>
                        <a
                          href="javascript:;"
                          onClick={() => {
                            modal('close', 'select-main-kat')
                            this.props.history.push(`/browse/${n.main_kat}`)
                          }}
                          className="text-muted"
                        >
                          {n.main_kat}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                'loading...'
              )}
            </div>
          </div>
          <div className="modal" id="select-sub-kat">
            <div className="container">
              <div className="modal-title">
                Pilih sub kategori dibawah ini
                <a className="btn btn-white btn-close-modal btn-sm fa fa-close" />
              </div>
              <hr />
              <ul className="vertical-menu list-categories">
                <li>
                  <a
                    href="javascript:;"
                    onClick={() =>
                      this.setState({ sub_kat: '' }, () => {
                        modal('close', 'select-sub-kat')
                        this.props.history.push(
                          `/browse/${categories.data[main_kat].main_kat}`
                        )
                      })
                    }
                    className="text-muted"
                  >
                    Semua subkategori
                  </a>
                </li>
                {parseInt(main_kat) >= 0
                  ? categories.data[main_kat].subkat.map((n, key) => {
                      return (
                        <li key={key}>
                          <a
                            href="javascript:;"
                            onClick={() => {
                              modal('close', 'select-sub-kat')
                              this.props.history.push(
                                `/browse/${
                                  categories.data[main_kat].main_kat
                                }/${n.sub_kat}`
                              )
                            }}
                            className="text-muted"
                          >
                            {n.sub_kat}
                          </a>
                        </li>
                      )
                    })
                  : null}
              </ul>
            </div>
          </div>
        </div>
        {/*end of modal*/}
      </div>
    )
  }
}

function setCategories(props = {}, state = {}) {
  let main_kat, sub_kat
  if (props.kompetisi.categories.meta) {
    if (props.match.params.mainkat) {
      props.kompetisi.categories.data.map((n, key) => {
        if (n.main_kat === props.match.params.mainkat) main_kat = key
      })
    } else {
      main_kat = ''
    }

    if (
      props.match.params.subkat &&
      props.kompetisi.categories.data[main_kat].subkat
    ) {
      props.kompetisi.categories.data[main_kat].subkat.map((n, key) => {
        if (n.sub_kat === props.match.params.subkat) sub_kat = key
      })
    } else {
      sub_kat = ''
    }
  }
  return {
    main_kat,
    sub_kat
  }
}

function generateState(query = {}, params = {}) {
  const { tag, username } = params
  const { mediapartner, berakhir, garansi, q } = query

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

function generateParams(n = {}, props = null) {
  const {
    main_kat,
    sub_kat,
    is_mediapartner,
    is_berakhir,
    q,
    tag,
    username,
    is_garansi
  } = n

  let Params = {}
  if (props) {
    const { categories } = props.kompetisi
    // browse competition by main category
    if (parseInt(main_kat) >= 0)
      Params.mainkat = categories.data[main_kat].main_kat
    
    // browse competition by sub category
    if (parseInt(sub_kat) >= 0)
      Params.subkat = categories.data[main_kat].subkat[sub_kat].sub_kat
  }

  // search competitino by keyword
  if (q && q != '') Params.keyword = q

  // browse competition by username
  if (username && username != '') Params.username = username

  // browse competition by tag
  if (tag && tag != '') Params.tag = tag

  // browse competition filter by media partner
  if (is_mediapartner) Params.mediapartner = true

  // browse competition filter by ended
  if (is_berakhir) Params.is_end = true

  // browse competition filter by guaranted
  if (is_garansi) Params.is_guaranted = true

  // limit data
  Params.limit = 9

  return Params
}

function generateFilter(n = {}) {
  const {
    main_kat,
    sub_kat,
    is_mediapartner,
    is_berakhir,
    q,
    tag,
    is_garansi
  } = n
  let Filter = 'jelajah'
  if (parseInt(main_kat) >= 0) Filter += `_${main_kat}`
  if (parseInt(sub_kat) >= 0) Filter += `_${sub_kat}`
  if (q != '') Filter += `_${q}`
  if (tag != '') Filter += `_${tag}`
  Filter = `${Filter}_${is_mediapartner}_${is_berakhir}_${is_garansi}`

  return Filter
}

function mapStateToProps(state) {
  const { Kompetisi } = state

  return {
    kompetisi: Kompetisi
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, KompetisiActions), dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
