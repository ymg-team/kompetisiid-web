import React from 'react'
import Kompetisi from '../components/box/Kompetisi'
import * as KompetisiActions from '../../store/kompetisi/actions'
import Filter from '../components/jelajah/Filter'
import Helmet from 'react-helmet'
import {Link} from 'react-router'
import {getStorage, setStorage} from '../../store/helpers/LocalStorage'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const icon_default = '/assets/images/icon-1.jpg'

const icon = [
    '/assets/images/icon-2.jpg'
]

class Jelajah extends React.Component
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
        //get categories
        const Categories = getStorage('categories')
        if(Categories)
        {
            this.props.dispatch(KompetisiActions.setCategories(JSON.parse(Categories)))
        }else 
        {
            this.props.dispatch(KompetisiActions.getCategories())
        }
        
        const _this = this

        this.setState(setCategories(this.props, this.state))

        window.addEventListener('scroll', function()
        {
            var Scrollpx = $(this).scrollTop()
            var ContainerHeight = $('#jelajah-container').height()
            if(Scrollpx >= ContainerHeight - 250) _this.reqMoreData()
        })
    }

    componentWillReceiveProps(np)
    {
        this.setState(Object.assign(generateState(np.location.query, np.params), setCategories(np, this.state)))
    }

    generateTitle()
    {
        const {categories} = this.props.kompetisi
        const {main_kat, sub_kat, tag} = this.state
        let title='Jelajah'
        if(main_kat != '') title = `${title} > ${categories.data[main_kat].main_kat}`
        if(sub_kat != '') title = `${title} > ${categories.data[main_kat].subkat[sub_kat].sub_kat}`
        if(tag != '') title = `${title} > tag : '${tag}'`
        if(this.state.q && this.state.q != '') title = `${title} > pencarian : '${this.state.q}'`
        return title
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

    reqMoreData()
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
        const {tag, username} = this.state
        let title= 'Jelajah - Kompetisi Indonesia'
        let description = 'Jelajahi kompetisi dari berbagai macam kategori di Kompetisi Indonesia'

        //jelajah kompetisi by tag
        if(tag != '') {
            title = `Jelajah - Tag : ${tag}`
            description = `Jelajahi kompetisi berdasarkan tag ${tag}`
        }

        //jelajah kompetisi by username
        if(username != '') {
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
                        {'property': 'og:url', 'content': 'http://kompetisi.id/browse'},
                        {'property': 'og:image', 'content': 'http://kompetisi.id/assets/images/wide-red-logo.png'},
                        {'property': 'og:description', 'content': description},
                        {'property': 'og:type', 'content': 'article'},
                    ]}
                />

                {/* content */}
                <div className='bg-white'>
                    <div className='container'>
                        {
                            // accesing jelajah by tag or competition by user
                            (tag != '' || username != '') ?
                                <div className='col-lg-12'>
                                    <div className='clearfix' />
                                    <div className='header-jelajah small'>
                                        { tag != '' ? <p>Jelajahi kompetisi berdasarkan tag "{tag}"</p>: null }
                                        { username != '' ? <p>Jelajahi kompetisi, dipasang oleh "<Link to={`/${username}`}>{username}</Link>"</p>: null }
                                    </div>
                                </div> :
                                // else
                                <div>
                                <div className='col-lg-12'>
                                    <hr/>
                                    <div className='clearfix' />
                                    <div className='media header-jelajah'>
                                        <div className='media-left media-middle'>
                                            <img className='media-object' src='/assets/images/icon-1.jpg' alt='...' />
                                        </div>
                                        <div className='media-body'>
                                            <div className='header-title medium color-red'>
                                                <h2>{!this.props.kompetisi.categories.meta ? 'jelajah' : this.generateTitle()}</h2>
                                            </div>
                                            <p>{description}. <small className='text-muted'>image from freepik</small></p>
                                        </div>
                                    </div>
                                    <div className='clearfix' />
                                    <hr/>
                                </div>
                                <div className='clearfix' />
                                <Filter
                                    categories = {this.props.kompetisi.categories}
                                    main_kat = {this.state.main_kat}
                                    sub_kat = {this.state.sub_kat}
                                    main_kat_name = {this.props.params.mainkat}
                                    sub_kat_name = {this.props.params.subkat}
                                    is_garansi = {this.state.is_garansi}
                                    is_mediapartner = {this.state.is_mediapartner}
                                    is_berakhir = {this.state.is_berakhir}
                                    q = {this.state.q}
                                    tag = {this.state.tag}
                                    changeState = {(n) => this.setState(n, () => {this.reqData()})}
                                    />
                                </div>    
                        }
                        
                        <div className='col-lg-12'>
                            {
                                this.props.kompetisi.data[generateFilter(this.state)] && this.props.kompetisi.data[generateFilter(this.state)].data ?
                                    <p>menampilkan <strong>{this.props.kompetisi.data[generateFilter(this.state)].data.length}</strong> dari <strong>banyak</strong> kompetisi</p>
                                    : <br />
                            }
                        </div>
                    </div>
                </div>

                {/* list competition */}
                <div id='jelajah-container'>
                    <Kompetisi
                        params={generateParams(this.state, this.props)}
                        filter={generateFilter(this.state)}
                        data={this.props.kompetisi.data}
                        class_title='header-title medium color-red'
                        dispatch={this.props.dispatch}
                    />
                </div>
            </div>

        )
    }
}

function setCategories(props, state)
{
    let {main_kat, sub_kat} = state
    if(props.kompetisi.categories.meta)
    {
        if(props.params.mainkat)
        {
            props.kompetisi.categories.data.map((n, key) => {
                if(n.main_kat === props.params.mainkat) main_kat = key
            })
        }

        if(props.params.subkat && props.kompetisi.categories.data[main_kat].subkat )
        {
            props.kompetisi.categories.data[main_kat].subkat.map((n, key) => {
                if(n.sub_kat === props.params.subkat) sub_kat = key
            })
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
        if(main_kat != '') Params.mainkat = categories.data[main_kat].main_kat
        if(sub_kat != '') Params.subkat = categories.data[main_kat].subkat[sub_kat].sub_kat
    }
    if(q && q != '') Params.q = q
    if(username && username != '') Params.username = username
    if(tag && tag != '') Params.tag = tag
    if(is_mediapartner) Params.mediapartner = 1
    if(is_berakhir) Params.berakhir = 1
    if(is_garansi) Params.garansi = 1
    Params.limit = 10

    return Params
}

function generateFilter(n)
{
    const {main_kat, sub_kat, is_mediapartner, is_berakhir, q, tag, is_garansi} = n
    let Filter = 'jelajah'
    if(main_kat != '') Filter = `${Filter}_${main_kat}`
    if(sub_kat != '') Filter = `${Filter}_${sub_kat}`
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Jelajah)
