import React, { Component } from 'react'
import Card from '../cards/NewsListCard'
import Loader from '../loaders/NewsLoader'
import Transition from 'react-transition-group/Transition'
import { duration, style } from '../../Transtition'
import { Link } from 'react-router-dom'

export default class NewsBox extends Component 
{
    generateList(n)
    {
        return n.map((n, key) => {
            return <Card key={key} n={n} />
        })
    }

    render()
    {
        const {data, meta, is_loading} = this.props
        return(
            <div id='news-container'>
                <div className='container'>
                    <div className='row no-margin'>
                    {
                        this.props.subtitle && meta && meta.code == 200 ?
                            <span style={{display: 'table'}}>
                                <br />
                                menampilkan&nbsp;<strong> {data.length}&nbsp;</strong>dari&nbsp;<strong>beberapa&nbsp;</strong>berita
                                <br />
                            </span>
                        : null
                    }                    
                    </div>
                    <div className='row m-10' />
                    <div className='row'>
                        <Transition in={data && data.length > 0} timeout={duration}>
                            {(state) => (
                                <div style={Object.assign({}, style.fade.default, style.fade[state])}>
                                {
                                    meta && meta.code ?
                                        !data ? 
                                            <p className='text-muted'>{meta.message}</p>
                                        : this.generateList(data)
                                    : null                            
                                }
                             </div> 
                            )}
                        </Transition>
                    </div>
                    { is_loading || !meta ? <Loader /> : null }
                </div>
            </div>
        )
    }
}

NewsBox.defaultProps = {
    subtitle: true
}
