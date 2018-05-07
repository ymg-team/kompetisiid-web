import React from 'react'
import { today } from '../../helpers/DateTime'

export default (props) => {
    if(props.data)
    {
        return (
            <div className='col-md-12 home-count'>
                <div className='container'>
                <div className='col-sm-3 col-xs-6 home-count-item'> 
                    <div className='home-count-text-large'>{today()}</div>
                    <div className='home-count-text-small text-gray'>Terus berkarya.</div>
                </div>
                <div className='col-sm-3 col-xs-6 home-count-item'> 
                    <div className='home-count-text-large'>{props.data.totalcompetition}</div>
                    <div className='home-count-text-small text-gray'>Kompetisi Aktif</div>
                </div>
                <div className='col-sm-3 col-xs-6 home-count-item'> 
                    <div className='home-count-text-large'>{props.data.totalthismounth}</div>
                    <div className='home-count-text-small text-gray'>Deadline Bulan ini</div>
                </div>
                <div className='col-sm-3 col-xs-6 home-count-item'> 
                    <div className='home-count-text-large'>{props.data.totalprize}</div>
                    <div className='home-count-text-small text-gray'>Nilai Total Hadiah</div>
                </div>
                </div>
            </div>
        )
    }
    
    return null
}
