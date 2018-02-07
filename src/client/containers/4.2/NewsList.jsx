import React, { Component } from 'react'
import Helmet from '../../components/Helmet'
import Subheader from '../../components/4.2/Subheader'
import Newsbox from '../../components/4.2/boxs/NewsBox'

import { fetchBerita, fetchBeritaMore } from '../../../store/berita/actions'
import {connect} from 'react-redux'
import { style, duration } from '../../components/Transtition'
import Transition from 'react-transition-group/Transition'

const Filter = 'list'
const Limit = 6

class NewsList extends Component 
{
    static fetchData({store})
    {
        return store.dispatch(fetchBerita({limit:Limit}, Filter))
    }

    constructor(props)
    {
        super(props)
        this.state = {
            ready: false
        }
    }

    componentDidMount()
    {
        setTimeout(() => {
            this.setState({ready: true})
        }, 10)
        this.reqData()
        window.scrollTo(0,0)
        const _this = this
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
        if(!this.props.berita.data[Filter]) this.props.dispatch(fetchBerita(Params, Filter))
    }

    reqMore()
    {
        let Params = {limit: Limit}
        const Berita = this.props.berita.data[Filter]
        if(Berita && Berita.data)
        {
            Params.lastid = Berita.data[Berita.data.length - 1].id
            if(!Berita.is_loading && Berita.meta.code === 200)
            {
                this.props.dispatch(fetchBeritaMore(Params, Filter))
            }
        }
    }

    render()
    {
        return(
            <Transition in={this.state.ready} timeout={duration}>
                {(state) => (
                    <div id='list-news' style={Object.assign({}, style.fade.default, style.fade[state])}>
                        <Helmet 
                            title="Berita - Kompetisi Indonesia"
                            description="Temukan berita seputar kompetisi di Indonesia"
                        />
                        <Subheader 
                            title='Berita kompetisi'
                            desc='Berita seputar kompetisi di Indonesia dan Internasional'
                        />
                        <Newsbox 
                            {...this.props.berita.data[Filter]}
                        />
                    </div>
                )}
            </Transition>
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

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsList)
