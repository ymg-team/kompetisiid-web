import React, {Component} from 'react'
import Tab, {tab} from '../../components/4.2/navigations/TabCompetition'
import Helmet from '../../components/Helmet'
import Loader from '../../components/4.2/loaders/DefaultLoader'
import CompetitionDetailBox from '../../components/4.2/boxs/CompetitionDetail'
import CompetitionListBox from '../../components/4.2/boxs/CompetitionBox'
import Regulations from '../../components/4.2/competition-detail/Regulations'
import Prizes from '../../components/4.2/competition-detail/Prizes'
import Announcements from '../../components/4.2/competition-detail/Announcements'
import Contacts from '../../components/4.2/competition-detail/Contacts'
import Share from '../../components/4.2/competition-detail/Share'
import Discussions from '../../components/4.2/competition-detail/Discussions'
import { Link } from 'react-router-dom'
import NextPrev from '../../components/4.2/navigations/NextPrev'
import ErrorCard from '../../components/4.2/cards/ErrorCard'
import Host from '../../../config/host'

import { pushScript } from '../../helpers/DomEvents'
import { toCamelCase } from 'string-manager'
import { getDetail, getRelated } from '../../../store/kompetisi/actions'
import { connect } from 'react-redux'

class CompetitionDetail extends Component 
{
  static fetchData({params, store})
  {
    return store.dispatch(getDetail(params.encid))
  }

  constructor(props){
      super(props)
      this.state = {
          encid: this.props.match.params.encid
      }
  }
  
  componentDidMount()
  {
    if(this.props.route.active_tab == 1) window.scrollTo(0,0)
    this.reqData(this.props)
    this.reqRelatedCompetitions(this.props)
    pushScript('https://kompetisiindonesia.disqus.com/embed.js')
  }

  componentWillReceiveProps(np)
  {
      this.setState({encid: np.match.params.encid})
      if(this.props.match.params.encid != np.match.params.encid)
      {
        if(window != undefined) 
          window.scrollTo(0,0)
        this.reqData(np)
        this.reqRelatedCompetitions(np)
      } 
  }

  componentWillUnmount()
  {
    window.onscroll = null
  }

  reqData(props)
  {
    const { encid } = props.match.params
    if(props.route.name != 'competition_regulation') window.scrollTo(0,0)
    if(!props.kompetisi.detail[encid]) this.props.dispatch(getDetail(encid))
  }

  reqRelatedCompetitions(props)
  {
    const { encid } = props.match.params
    if(!props.kompetisi.data[`related_${ encid }`]) 
      this.props.dispatch(getRelated(encid, `related_${ encid }`))
  }

  render()
  {
    const { encid } = this.state
    const { detail,related,pengumuman } = this.props.kompetisi
    const { active_tab } = this.props.route
    let NextPrevProps = {}, helmetdata = {script: []}  

    // generate helmet data 
    if(detail[encid] && detail[encid].meta && parseInt(detail[encid].meta.code) === 200)
    {
      setTimeout(() => {if(typeof window != 'undefined'){handleScrollNav()}}, 2000)
      helmetdata = Object.assign(helmetdata, {
        title: toCamelCase(`${tab[this.props.route.active_tab  - 1].name + ' ' || ''}${detail[encid].data.title}`),
        description: detail[encid].data.sort,
        image: detail[encid].data.poster.original,
        url: `${Host[process.env.NODE_ENV].front}/competition/${detail[encid].data.id_kompetisi}/regulations/${detail[encid].data.nospace_title}`
      })
            
      // add jsonld
      helmetdata.script.push({
        type: 'application/ld+json',
        innerHTML: generateJsonld(detail[encid].data, helmetdata.url)
      })
      
      // nextprev props 
      if(Object.keys(detail[encid].data.next).length > 0)
      {
        NextPrevProps.next = {
          title: detail[encid].data.next.title,
          link: `/competition/${detail[encid].data.next.id_kompetisi}/regulations/${detail[encid].data.next.nospace_title}`
        }
      }

      if(Object.keys(detail[encid].data.prev).length > 0)
      {
        NextPrevProps.prev = {
          title: detail[encid].data.prev.title,
          link: `/competition/${detail[encid].data.prev.id_kompetisi}/regulations/${detail[encid].data.prev.nospace_title}`
        }
      }
    }
    
    return(
      <div>
        <Helmet {...helmetdata} />
        {
          detail[encid] && detail[encid].meta  ?
              detail[encid].meta.code == 200 ?
              <div className='competition-detail'>
                <CompetitionDetailBox 
                  data={detail[encid].data} />
                <Tab 
                  active={this.props.route.active_tab} 
                  data={detail[encid].data}
                  />
                <div className='col-md-12'>
                  <div className='container'>
                    <div className='row competition-detail--content'>
                      <div className='col-md-10 col-md-push-1'>
                        {/*alert*/}
                        {!detail[encid].data.is_mediapartner && !detail[encid].data.is_support ? 
                          <div style={{marginTop:0}} className='alert alert-warning'>
                            <strong>Perhatian&nbsp;</strong>
                            Di kompetisi ini, <strong>Kompetisi Indonesia </strong>hanya berlaku sebagai media publikasi. Jika ada pertanyaan lebih lanjut mengenai kompetisi ini silahkan sampaikan langsung ke kontak yang tersedia tab kontak.
                          </div>
                        : null}
                        {detail[encid].data.is_mediapartner && !detail[encid].data.is_support ? 
                          <div style={{marginTop:0}} className='alert alert-blue'>
                            <strong>Perhatian&nbsp;</strong>
                            Di kompetisi ini, <strong>Kompetisi Indonesia </strong>berlaku sebagai media partner, jika ada pertanyaan lebih lanjut mengenai kompetisi ini, bisa ditanyakan langsung ke penyelenggara atau melalui tab diskusi.
                          </div>
                        : null}
                        {detail[encid].data.is_support ? 
                            <div style={{marginTop:0}} className='alert alert-blue'>
                              <strong>Perhatian&nbsp;</strong>
                              Kompetisi ini bisa diikuti langsung di <strong>Kompetisi Indonesia</strong>, silahkan login dan klik tombol 'ikuti kompetisi'.
                            </div>
                          : null}
                        {/*end of alert*/}
                        <div className='m-20' />
                        <div className='row'>
                          <div className={active_tab == 1 ? 'col-md-8' : 'col-md-12'}>
                            {
                              (() => {
                                switch(active_tab)
                                {
                                  case 1:
                                    return <Regulations
                                            encid={encid}
                                            nospace_title={detail[encid].data.nospace_title} 
                                            sumber={detail[encid].data.sumber}
                                            tags={detail[encid].data.tags ? detail[encid].data.tags.split(',') : []}
                                            html={detail[encid].data.konten}/>
                                  case 2:
                                    return <Prizes 
                                            html={detail[encid].data.hadiah} />
                                  case 3:
                                    return <Announcements 
                                            data={detail[encid].data.dataPengumuman != '' ? JSON.parse(detail[encid].data.dataPengumuman): {}} />
                                  case 4:
                                    return <Discussions 
                                            link={helmetdata.url} />
                                  case 5:
                                    return <Contacts 
                                            data={JSON.parse(detail[encid].data.kontak)} />
                                  case 6:
                                    return <Share
                                            title={detail[encid].data.title}
                                            desc={detail[encid].data.sort}
                                            link={helmetdata.url}/>
                                  default:
                                    return null
                                }
                              })()
                            }                          
                          </div>
                          {/* show sidebar info */}
                          {
                            active_tab == 1 ?
                              <div className='col-md-4'>
                                <div className='competition-detail--meta'>
                                  <progress value={30} max={100} />
                                  <h3 className='total-prize'>
                                    <strong>{detail[encid].data.total_hadiah}</strong>
                                    <small className='text-muted'>total hadiah</small>
                                  </h3>
                                  <h3 className='total-view'>{detail[encid].data.views}<small className='text-muted'>kunjungan</small></h3>
                                  <h3 className='total-view'>{detail[encid].data.sisadeadline}<small className='text-muted'>{`deadline (${detail[encid].data.deadline})`}</small></h3>
                                  <h3 className='total-view'>{detail[encid].data.sisapengumuman}<small className='text-muted'>{`pengumuman (${detail[encid].data.pengumuman})`}</small></h3>
                                </div>  
                                <hr/>
                                <h4 className='text-muted'>Kompetisi ini bersifat</h4>
                                {detail[encid].data.is_garansi ? <span title='kompetisi sudah diverifikasi keberadaannya oleh kru KI' className='label label-gray'>Garansi</span> : null }
                                {detail[encid].data.is_mediapartner ? <span title='KI berlaku sebagai media partner di kompetisi ini' className='label label-gray'>Media Partner</span> : null}
                                {detail[encid].data.is_support ? <span title='kompetisi ini bisa diikuti melelui KI' className='label label-gray'>Support</span> : null}                     
                                <br/>
                                <br/>
                                {/* show you */}
                                <a target='_blank' href='https://vip.bitcoin.co.id/ref/xyussanx/1'>
                                  <img style={{maxWidth: '100%'}} src='https://s3.amazonaws.com/bitcoin.co.id/banner/250x250.jpg' alt='Yuk berdagang Bitcoin dan dapatkan keuntungan jutaan rupiah' />
                                </a>
                              </div>
                            : null
                          }
                          {/* end of show sidebar info */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*next prev*/}
                <NextPrev {...NextPrevProps} />

                {/*related competitions*/}
                {
                  related[`related_${encid}`] && related[`related_${encid}`].meta && related[`related_${encid}`].meta.code == 200 ?
                    <div className='col-md-12 bg-gray-soft'>
                      <div className='m-20 row' />
                      <CompetitionListBox subtitle={false} size='small' {...related[`related_${encid}`]} />
                    </div>
                  : null 
                }
              </div> 
              : <ErrorCard {...detail[encid].meta} />
          :<div className='fullheight'><Loader /></div>   
        }        
      </div>
    )
  }
}

function generateJsonld(n, url)
{
  const start_date = n.created_at.split(' ')
  const end_date = n.deadline_at.split(' ')
  return `{
    "@context": "http://schema.org",
    "@type": "Event",
    "name": "${n.title.replace(/\"/g, "")}",
    "description": "${n.sort.replace(/\"/g, "")}",
    "startDate": "${start_date[0]}T${start_date[1]}.000Z",
    "endDate": "${end_date[0]}T${end_date[1]}.000Z",
    "url": "${url}",
    "sameAs": "${n.sumber}",
    "image": {
        "@type": "ImageObject",
        "url": "${n.poster.original}",
        "height": "500",
        "width": "500"
    },
    "organizer": {
      "@type": "Organization",
      "name": "${n.penyelenggara}",
      "logo": {
          "@type": "ImageObject",
          "url": "https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/21529_1680281178877316_3989323526762937427_n.png?oh=30d4cacd082cb9b7bffbd9abf01c1cb0&oe=5A01639C",
          "height": "500",
          "width": "500"
      }
    },
    "location": {
      "@type": "Place",
      "name": "Indonesia",
      "address": "Indonesia"
    }
  }`
}

function handleScrollNav()
{
  window.onscroll= function(){
      const afterScroll = document.getElementById('competition-detail').offsetHeight + 40
      const tabEl = document.getElementById('container-competition-tab')
      const joinEl = document.getElementById('btn-join')
      if(joinEl && afterScroll)
      {
        if(document.body.scrollTop > afterScroll)
        {
            addClass(tabEl, 'fixed')
            joinEl.style.opacity = 1
        }else 
        {
            removeClass(tabEl, 'fixed')
            joinEl.style.opacity = 0
        }
      }
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
)(CompetitionDetail)
