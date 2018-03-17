import React from 'react'
import Card from '../../../components/4.2/cards/CompetitionListCard'
import Loader from '../loaders/CompetitionLoader'
import Transition from 'react-transition-group/Transition'
import { duration, style } from '../../Transtition'
import { Link } from 'react-router-dom'

function generateList(size, n)
{
    return n.map((n, key) => (
        <Card size={size} key={key} n={n} />
    ))
}

const CompetitionBox = (props) => {
    let {data, meta, is_loading, subtitle, size} = props
    if(typeof subtitle == 'undefined') subtitle = true
    if(typeof size == 'undefined') size = 'large'

    return (
      <div id='competition-container'>
          <div className='container'>
            <div className='row no-margin'>
              {
                  meta && meta.code == 200 && subtitle ?
                      <span style={{display: 'table'}}>
                          <br />
                          menampilkan <strong> {data.length}&nbsp;</strong>dari&nbsp;<strong>beberapa&nbsp;</strong>kompetisi
                          <br />
                      </span>
                  : null
              }
              {subtitle ? <div className='row m-10' /> : null}
                <Transition in={meta && meta.code > 0} timeout={duration}>
                    {(state) => (
                        <div className='row' style={Object.assign({}, style.fade.default, style.fade[state])}>
                        {
                            meta && meta.code ?
                                !data ? 
                                    <p className='text-muted'>{meta.message}</p>
                                : generateList(size, data)   
                                            
                            : null                            
                        }
                        </div> 
                    )}
                </Transition>
                
              { is_loading || !meta ? <Loader size={props.size} total={props.total} /> : null }
              <div className='row m-10' />                
            </div>
          </div>
      </div>
    )
}

export default CompetitionBox