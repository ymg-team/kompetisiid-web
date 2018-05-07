import React from 'react'
import { Link } from 'react-router-dom'
import BtnJoin from '../buttons/BtnJoin'

const TabCompetition = (props) => {
  const n_pengumuman = props.data && props.data.dataPengumuman ? JSON.parse(props.data.dataPengumuman).length : 0
  const n_kontak = props.data && props.data.kontak ? JSON.parse(props.data.kontak).length : 0
  return <div id='container-competition-tab' className='row no-margin container-competition-tab'>
    <div className='col-md-12'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 col-md-push-1'>
            <div className='tab-competition'>
              <ul className='horizontal-menu'>
                {
                  tab.map((n, key) => (
                    <li key={key} className={(props.active - 1) == key ? 'active' : ''}>
                        <Link to={`/competition/${props.data.id_kompetisi}/${tab[key].link}/${props.data.nospace_title}`}>
                          {n.name}
                          {' '}
                          {n.name == 'pengumuman' && n_pengumuman > 0 ? 
                            <div className={`label label-small ${(props.active - 1) == key ? 'label-red' : 'label-white'}`}>{n_pengumuman}</div> :
                             null}
                          {n.name == 'kontak' && n_kontak > 0 ? 
                            <div className={`label label-small ${(props.active - 1) == key ? 'label-red' : 'label-white'}`}>{n_kontak}</div> :
                             null}
                        </Link>
                      </li>
                  ))
                }
              </ul>
              <BtnJoin 
                id='btn-join'
                {...props}
              />                  
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
