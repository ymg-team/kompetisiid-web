import React from 'react'
import {Link} from 'react-router'

const TabCompetition = (props) => {
  const {id, title} = props
  return(
      <div id='container-competition-tab' className='row no-margin container-competition-tab'>
        <div className='col-md-12'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-10 col-md-push-1'>
                <div className='tab-competition'>
                  <ul className='horizontal-menu'>
                    {
                      tab.map((n, key) => {
                        return(
                          <li key={key} className={(props.active - 1) == key ? 'active' : ''}>
                            <Link to={`/competition/${id}/${tab[key].link}/${title}`}>{n.name}</Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                  {
                    props.linkJoin ? 
                      <div style={{float: 'right', display: 'inline-flex', marginTop: '.6em'}}>
                        <a href={`/competition/${id}/join/${title}`} target="_blank" className="btn btn-green btn-join btn-lg" id="btn-join" style={{opacity: 0}}>Ikuti kompetisi</a>
                      </div>
                    : null
                  }                   
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default TabCompetition

export const tab = [
  {
    name: 'peraturan',
    link: 'regulations'
  },
  {
    name: 'hadiah',
    link: 'prizes'
  },
  {
    name: 'pengumuman',
    link: 'annoucements'
  },
  {
    name: 'diskusi',
    link: 'discussions'
  },
  {
    name: 'kontak',
    link: 'contacts'
  },
  {
    name: 'share',
    link: 'share'
  }
]