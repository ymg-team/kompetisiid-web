import React from 'react'
import {Link} from 'react-router'
import {openInNewTab} from '../../../helpers/LinkGenerator'
import {eventFire} from '../../../helpers/DomEvents'
import copy from 'copy-to-clipboard';

class CompetitionDetailBox extends React.Component {
    render()
    {
        const {data} = this.props
        const link_competition = `https://kompetisi.id/competition/${data.id_kompetisi}/regulations/${data.nospace_title}`
        return(
            <div id='competition-detail' className='row no-margin p-50-0'>
                <div className='col-md-12'>
                    <div className='container'>
                    <div className='competition-author'>
                            <Link to={`/${data.author.username}`} title={`ke profil ${data.author.username}`}>
                                <img style={{float:'left',marginRight:'10px'}} src='/assets/4.2/img/default-avatar.jpg' />
                            </Link>
                            <p>
                                dipasang oleh <Link className='text-muted' to={`/${data.author.username}`}>{data.author.username}</Link>
                                <br />
                                <small className='text-muted'>{data.created_in} di
                                    {' '}
                                    <a className='text-muted' href={`/browse/${data.mainkategori}`}>
                                        <strong>{`${data.mainkategori}`}</strong>
                                    </a>,
                                    <a className='text-muted' href={`/browse/${data.subkategori}`}>
                                        <strong>{`${data.subkategori}`}</strong>
                                    </a>
                                </small>
                            </p>
                    </div>
                    <div className='row m-20' />
                        <div className='row competition-detail--meta'>
                            <div className='col-md-6 align-center poster'>
                                <img alt={data.title} className='poster' src={data.poster.original} />
                            </div>
                            <div className='col-md-6 count'>
                                <div className='only-mobile m-30' />
                                {/* competition status */}
                                <div style={{marginBottom:'20px'}}>
                                    {
                                        data.sisadeadline == 'berakhir' && data.sisapengumuman == 'berakhir' ? 
                                        <span className='label label-red label-lg'>
                                            <i className='fa fa-check' /> Kompetisi telah berakhir
                                        </span>
                                        : data.sisadeadline == 'berakhir' && data.sisapengumuman != 'berakhir' ?
                                        <span title={`Pengumuan pemenang dalam ${data.sisapengumuman}`} className='label label-orange label-lg'>
                                            <i className='fa fa-flag' /> Kompetisi sedang berlangsung
                                        </span> : 
                                        <span className='label label-gray label-lg'>
                                            <i className='fa fa-wpforms' /> Batas pendaftaran {data.sisadeadline}
                                        </span>
                                    }
                                </div>
                                <div className='competition-detail--title'>
                                    <h1>{data.title}</h1>
                                    <div className='m-20' />
                                    <p className='text-muted'>Diselenggarakan oleh <strong>{data.penyelenggara}</strong></p>
                                    <div className='m-20' />
                                    <p className='text-muted'>{data.sort}</p>
                                </div>
                                <div className='m-30' />
                                    {
                                        data.ikuti ?
                                            <a style={{marginRight:'10px'}} href={`/competition/${data.id_kompetisi}/join/${data.nospace_title}`} target='_blank' className='btn btn-green btn-join btn-lg'>Ikuti kompetisi</a> :
                                        null
                                    }                                
                                <a style={{marginRight:'10px'}} onClick={() => fullalert('warning', 'login terlebih dahulu untuk menyimpan')} className='btn btn-white' href='javascript:;' title='simpan ke akun'><i className='fa fa-save' /></a>
                                <a style={{marginRight:'10px'}} onClick={() => {modal('open', 'save-to-calendar')}} className='btn btn-white' href='javascript:;' title='simpan ke kalender'><i className='fa fa-calendar' /></a>
                                <div className='dropdown'>
                                    <a className='fa fa-ellipsis-v btn btn-gray dropdown-button' data-target='action-competition' />
                                    <div className='dropdown-items' id='action-competition'>
                                    <ul>
                                        <li><a className='scopy-button' onClick={() => handleCopyLink(link_competition)} target='_blank' href='javascript:;'>Copy Link</a></li>
                                        <li><a target='_blank' href={`https://docs.google.com/forms/d/e/1FAIpQLSdmsHkJdGctVkWYFhhLC10YYVbtNIi5IF8X0mbdd2DjS-N1eQ/viewform?entry.559533126=${link_competition}`}>Laporkan Kompetisi</a></li>
                                    </ul>
                                    </div>
                                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                {/* modal save to calendar */}
                <div className='modal' id='save-to-calendar'>
                    <div className='container'>
                        <h2 className='modal-title'>Simpan ke kalender</h2>
                        <a className='btn btn-white btn-close-modal btn-sm fa fa-close' href='javascript:;' />
                        <hr />
                        <a target='_blank' href={addCalendar.google(data)}>
                            <img style={{'width': 'inherit'}} src='/assets/4.2/img/google-calendar-icon.fullwidth.png' />
                        </a>
                        <a target='_blank' href={addCalendar.yahoo(data)}>
                            <img style={{'width': 'inherit'}} src='/assets/4.2/img/yahoo-calendar-icon.fullwidth.png' />
                        </a>
                        <a onClick={() => fullalert('warning', 'untuk sekarang, kalender Microsoft untuk saat ini belum tersedia')} href='javascript:;'>
                            <img style={{'width': 'inherit'}} src='/assets/4.2/img/microsoft-calendar-icon.fullwidth.png' />
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

const addCalendar = {
    google: (n, url) => {
        const d = n.deadline_at.split(' ')
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=deadline ${n.title}&dates=${d[0].replace(/-/g,'')}T000000Z/${d[0].replace(/-/g,'')}T240000Z&details=${n.sort+'\n'+n.hadiah}&location=http://kompetisi.id/competition/${n.id_kompetisi}/regulations/${n.nospace_title}&sf=true&output=xml#eventpage_6`
    },
    yahoo: (n, url) => {
        const d = n.deadline_at.split(' ')
        return `https://calendar.yahoo.com/?v=60&view=d&type=20&title=deadline ${n.title}&st=${d[0].replace(/-/g,'')}T000000Z&dur=0600&desc=${n.sort + '\n'+ n.hadiah}&in_loc=http://kompetisi.id/competition/${n.id_kompetisi}/regulations/${n.nospace_title}`
    },
    microsoft: () => {
        
    }
}

// function to handle copy link
function handleCopyLink(link)
{
    // trigger to click body
    eventFire(document.getElementsByTagName('body')[0], 'click') 
    // copy
    copy(link)
    // alert if link has copied
    fullalert('success', 'Link telah berhasil di copy.')
}

export default CompetitionDetailBox