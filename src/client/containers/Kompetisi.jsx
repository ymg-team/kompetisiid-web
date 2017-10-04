import React from 'react'
import TabContent from '../components/kompetisi/TabContent'
import * as KompetisiAct from '../../store/kompetisi/actions'
import SubHeader from '../components/kompetisi/SubHeader'
import CardDetail from '../components/card/KompetisiDetail'
import {Link} from 'react-router'
import KompetisiBox from '../components/box/Kompetisi'
import Author from '../components/card/Author'
import Warning from '../components/kompetisi/Warning'
import Helmet from '../components/Helmet'

import {connect} from 'react-redux'

class Kompetisi extends React.Component
{

    static fetchData({params, store})
    {
        return store.dispatch(KompetisiAct.getDetail(params.encid))
    }

    constructor(props){
        super(props)
        this.state = {
            encid: this.props.params.encid
        }
    }

    componentDidMount()
    {
        this.checkData(this.props)
    }

    componentWillReceiveProps(nprops)
    {
        this.setState({encid: nprops.params.encid})
        if(this.props.params.encid != nprops.params.encid)
        {
            this.checkData(nprops)
        }
    }

    checkData(props)
    {
        const {encid} = props.params
        if(props.route.name === 'competition_regulation')  window.scrollTo(0,0)
        if(!props.kompetisi.detail[encid]) this.props.dispatch(getDetail(encid))
    }

    generateNextPrev()
    {
        const {encid} = this.props.params
        const {detail} = this.props.kompetisi

        return(
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-6 text-left'>
                    {
                        detail[encid].data.prev.id_kompetisi ?
                            <Link to={`/kompetisi/detail/${detail[encid].data.prev.id_kompetisi}/${detail[encid].data.prev.nospace_title}`}>
                                <i className='glyphicon glyphicon-chevron-left' />sebelumnya<br />
                                {detail[encid].data.prev.title}
                            </Link>
                            : <div />
                    }
                </div>
                <div className='col-lg-6 col-md-6 col-sm-6 text-right'>
                    {
                        detail[encid].data.next.id_kompetisi ?
                            <Link to={`/kompetisi/detail/${detail[encid].data.next.id_kompetisi}/${detail[encid].data.next.nospace_title}`}>
                                <i className='glyphicon glyphicon-chevron-right' />berikutnya<br />
                                {detail[encid].data.next.title}
                            </Link>
                            : <div />
                    }
                </div>
            </div>
        )
    }

    render()
    {
        const {encid} = this.state
        const {detail,pengumuman} = this.props.kompetisi
        let helmetdata = {}

        if(detail[encid] && detail[encid].meta && parseInt(detail[encid].meta.code) === 200)
        {
            const tab = {
                1: '',
                2: 'Hadiah ',
                3: 'Diskusi ',
                4: 'Pengumuman ',
                5: 'Kontak ',
                6: 'Share '
            }
            helmetdata = {
                title: `${tab[this.props.route.active_tab] || ''}${detail[encid].data.title}`,
                description: detail[encid].data.sort,
                image: detail[encid].data.poster.original,
                url: `http://kompetisi.id/competition/${detail[encid].data.id_kompetisi}/regulations/${detail[encid].data.nospace_title}`
            }
        }else
        {
            helmetdata = {
                title: 'kompetisi tidak ditemukan',
                description: 'kompetisi tidak ditemukan'
            }
        }
        return(
            <div>
                <Helmet {...helmetdata} />
                <div className='clearfix' />
                <SubHeader
                    data={detail[encid]}
                />
                <div className='p-15' />
                {
                    detail[encid] && detail[encid].meta && parseInt(detail[encid].meta.code) === 200 ?
                        <div className='bg-white'>
                            <div className='container'>
                                <div className='clearfix' />
                                <div className='col-md-12'>
                                    <Warning data={detail[encid].data} />                             
                                </div>
                                <div className='col-md-8'>
                                    <TabContent
                                        data={detail[encid]}
                                        pengumuman={pengumuman}
                                        encid={encid}
                                        active={this.props.route.active_tab}
                                        dispatch={this.props.dispatch}
                                    />
                                    {detail[encid] && detail[encid].data ?
                                        <Author
                                            username={detail[encid].data.username}
                                            created_at={detail[encid].data.created_at}
                                            updated_at={detail[encid].data.updated_at}
                                        />
                                        : null}
                                    <div className='clearfix' />
                                    {
                                        (detail[encid] && detail[encid].meta && parseInt(detail[encid].meta.code) === 200) ?
                                            this.generateNextPrev(): null
                                    }

                                </div>
                                {/* meta action */}
                                <CardDetail
                                    data={detail[encid]}
                                />
                                <div className='clearfix' />
                            </div>
                        </div> :
                        null
                }
                <KompetisiBox
                    title='Kompetisi Lainnya'
                    is_related={true}
                    dispatch={this.props.dispatch}
                    id={encid}
                    filter={`related_${encid}`}
                    data={this.props.kompetisi.related}
                />
            </div>
        )
    }
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
        dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Kompetisi)

