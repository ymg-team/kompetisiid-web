import React, { Component } from 'react'
import Helmet from '../../components/Helmet'
import Subheader from '../../components/Subheader'
import Newsbox from '../../components/boxs/NewsBox'

import { fetchBerita, fetchBeritaMore } from './actions'
import { connect } from 'react-redux'

const Filter = 'list'
const Limit = 6

class List extends Component
{
    // static fetchData({store})
    // {
    //     return store.dispatch(fetchBerita({ limit: Limit }, Filter))
    // }

    constructor(props)
    {
        super(props)
    }

    componentDidMount()
    {
        this.reqData()
        window.scrollTo(0,0)
        window.addEventListener('scroll', (e) => this.handleScroll(e), true)
    }

    componentWillUnmount()
    {
        window.removeEventListener('scroll', (e) => this.handleScroll(e), true)
    }

    handleScroll()
    {
        if(document.getElementById('list-news'))
        {
            const ContainerHeight = document.getElementById('news-container').offsetHeight
            if(window.pageYOffset >= ContainerHeight - 600) this.reqMore()
        }
    }

    reqData()
    {
        let Params = {limit: Limit}
        Params.status = 'published'
        if(!this.props.berita.data[Filter]) this.props.dispatch(fetchBerita(Params, Filter))
    }

    reqMore()
    {
        let Params = {limit: Limit}
        Params.status = 'published'
        const Berita = this.props.berita.data[Filter]
        if(Berita && Berita.data)
        {
            Params.lastid = Berita.data[Berita.data.length - 1].id
            if(!Berita.is_loading && Berita.status === 200)
            {
                this.props.dispatch(fetchBeritaMore(Params, Filter))
            }
        }
    }

    render()
    {
        return(
            <div id='list-news'>
                <Helmet 
                    title="Kabar - Kompetisi.id"
                    description="Temukan kabar seputar kompetisi di Indonesia"
                />
                <Subheader 
                    title='Kabar kompetisi'
                    desc='Kabar seputar kompetisi di Indonesia dan Internasional'
                />
                <Newsbox 
                    {...this.props.berita.data[Filter]}
                />
            </div>
        )
    }
}

function mapStateToProps(state)
{
    const {Berita} = state
    return {
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
)(List)
