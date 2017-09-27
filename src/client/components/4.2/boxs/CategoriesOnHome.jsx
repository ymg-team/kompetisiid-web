import React, {Component} from 'react'
import Loader from '../loaders/DefaultLoader'
import {Link} from 'react-router'
import {setProgressBar} from '../cards/CompetitionListCard'

export default class CategoriesOnHome extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            active: 0,
            categories: props.categories
        }
    }

    componentDidMount()
    {
        this.reqData()
    }

    reqData()
    {
        const {dispatch} = this.props
        const {active} = this.state
        const params = {
            limit: 1,
            mainkat:  this.props.categories.data.find((n, key) => {return active == key}).main_kat
        }
        return this.props.fetchJelajah(params, `home_category_${active}`)
    }

    render()
    {
        const {kompetisi} = this.props
        const {active, categories} = this.state
        const Filter = `home_category_${active}`
        console.log(kompetisi.data[Filter])
        return(
            <div className='col-md-12' style={{borderBottom: '1px solid #969696'}}>
                <div className='container'>
                    <div className='row'>
                        <div className='subtitle-more'>
                            <h2 className='menu-title'>Kompetisi Utama</h2>
                            <Link 
                                to={`/browse/${categories.data[active].main_kat}`}
                                className='btn btn-white btn-sm' 
                                style={{marginTop: '-72px', float: 'right'}}>
                                {`Lihat ${categories.data[active].main_kat}`}
                            </Link>
                        </div>
                    </div>
                    <div className='row'>
                        {
                            kompetisi.data[Filter] && kompetisi.data[Filter].meta ?
                                kompetisi.data[Filter].meta.code == 200 ?
                                    <div>
                                        <div className='col-md-5'>
                                            <div className='main-competition--left'>
                                                <Link to={`/competition/${kompetisi.data[Filter].data[0].id_kompetisi}/regulations/${kompetisi.data[Filter].data[0].nospace_title}`}>
                                                    <img 
                                                        alt={kompetisi.data[Filter].data[0].title} 
                                                        src={kompetisi.data[Filter].data[0].poster.small} />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='col-md-5'>
                                            <article className='main-competition--right'>
                                                <div className='categories'>
                                                    <Link className='text-muted' to={`/browse/${kompetisi.data[Filter].data[0].mainkategori}`}> 
                                                        <strong>{kompetisi.data[Filter].data[0].mainkategori}</strong>
                                                    </Link>,&nbsp;
                                                    <Link className='text-muted' to={`/browse/${kompetisi.data[Filter].data[0].mainkategori}/${kompetisi.data[Filter].data[0].subkategori}`}>
                                                        <strong>{kompetisi.data[Filter].data[0].subkategori}</strong>
                                                    </Link>
                                                </div>
                                                <br/>
                                                <Link to={`/competition/${kompetisi.data[Filter].data[0].id_kompetisi}/regulations/${kompetisi.data[Filter].data[0].nospace_title}`}>
                                                    <h3 className='title'>{kompetisi.data[Filter].data[0].title}</h3>
                                                </Link>
                                                <small>Dipasang &nbsp;<Link to={`/${kompetisi.data[Filter].data[0].author.username}`}>{kompetisi.data[Filter].data[0].author.username}</Link></small>
                                                <p>{kompetisi.data[Filter].data[0].sort}</p>
                                                <progress value={setProgressBar(kompetisi.data[Filter].data[0].deadline_at)} max={100} />
                                                <div className='meta'>
                                                    <div className='text-1'>
                                                        <div className='count'>{kompetisi.data[Filter].data[0].total_hadiah}</div>
                                                        <div className='text-muted'>total hadiah</div>
                                                    </div>
                                                    <div className='text-2'>
                                                        <div className='count'>{kompetisi.data[Filter].data[0].sisadeadline}</div>
                                                        <div className='text-muted'>deadline</div>
                                                    </div>
                                                    <div className='text-2'>
                                                        <div className='count'>{kompetisi.data[Filter].data[0].sisapengumuman}</div>
                                                        <div className='text-muted'>kunjungan</div>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                : <div className='col-md-10'><p /></div>
                            : <div className='col-md-10'><Loader /></div>
                        }
                        <div className='col-md-2'>
                            <div className='home-categories-list'>
                            <ul>
                                {
                                    categories.data.map((n, key) => {
                                        return(
                                            <li 
                                                key={key}
                                                className={active === key ? 'active' : ''}
                                                onClick={() => this.setState({active: key}, () => {
                                                    this.reqData()
                                                })}>
                                                <a href='javascript:;'>
                                                    {n.main_kat}
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}