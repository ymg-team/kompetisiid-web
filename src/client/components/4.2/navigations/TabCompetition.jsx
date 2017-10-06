import React from 'react'
import {Link} from 'react-router'
import BtnJoin from '../buttons/BtnJoin'

const TabCompetition = (props) => (
  <div id='container-competition-tab' className='row no-margin container-competition-tab'>
    <div className='col-md-12'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 col-md-push-1'>
            <div className='tab-competition'>
              <ul className='horizontal-menu'>
                {
                  tab.map((n, key) => (
                    <li key={key} className={(props.active - 1) == key ? 'active' : ''}>
                        <Link to={`/competition/${props.data.id_kompetisi}/${tab[key].link}/${props.data.nospace_title}`}>{n.name}</Link>
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
)

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