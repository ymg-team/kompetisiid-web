import React, {Component} from 'react'
import {Link} from 'react-router'

export default class CompetitionListCard extends Component
{
    handleDelete(id)
    {

    }

    render()
    {
        const {n} = this.props 
        return (
            <div className='competition-items'>
                <div className='item'>
                    <div className='item__left'>
                        <h4>
                            <Link to={`/dashboard/competition/${n.id_kompetisi}`}>
                                {n.title}
                            </Link>
                        </h4>
                        <p className='text-muted' style={{margin: 0}}>
                            <span title={n.created_at}>dipost {n.created_in}</span>
                            {' '}
                            oleh <Link title={n.username} to={`/dashboard/user/${n.username}`}>{n.username}</Link>
                            <br /> 
                            di 
                            {' '}
                            <a href={`/browse/${n.mainkategori}`} target='_blank'>{n.mainkategori}</a>
                            -
                            <a href={`/browse/${n.mainkategori}/${n.subkategori}`} target='_blank'>{n.subkategori}</a>
                        </p>
                        {n.is_garansi ? <span className='label label-blue'>garansi</span> : null }
                        {n.is_mediapartner ? <span className='label label-green'>media partner </span> : null }
                        {n.is_support ? <span className='label label-green'>support </span> : null }
                        <span className='label label-red'>
                            {n.is_berakhir ? 
                                n.sisapengumuman != 'berakhir' ? 
                                    `pengumuman ${n.sisapengumuman}` : 
                                    'berakhir' : 
                                `deadline ${n.sisadeadline}`}
                        </span>
                    </div>
                    <div className='item__right'>
                        <div className='item__right-item'>
                            <h4 className='text-muted' style={{color: (n.contenttext.split(' ')).length < 300 ? '#cf3030' : 'inherit'}} title='total kata dalam deskripsi'><i className='fa fa-file-text-o'>{(n.contenttext.split(' ')).length}</i></h4>
                        </div>
                        {' '}
                        <div className='item__right-item'>
                            <h4 className='text-muted' title='total views'><i className='fa fa-eye'>{n.views}</i></h4>
                        </div>
                        <div className='item__right-item'>
                        <div className='dropdown'><a className='btn btn-sm dropdown-button text-muted' title='options' href='javascript:;' data-target='menu-2'><i className='fa fa-ellipsis-v' /></a>
                            <div className='dropdown-items' id='menu-2'>
                            <ul>
                                <li><a target='_blank' href={`/competition/${n.id_kompetisi}/regulations/${n.nospace_title}`}>Preview</a></li>
                                <li><Link to={`/dashboard/competition/${n.id_kompetisi}`}>Ubah</Link></li>
                                <li><a onClick={() => this.handleDelete(n.id)} href='javascript:;'>Hapus</a></li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}