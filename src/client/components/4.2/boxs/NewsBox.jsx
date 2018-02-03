import React, { Component } from 'react'
import Card from '../cards/NewsListCard'
import Loader from '../loaders/NewsLoader'
import { Link } from 'react-router'

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
                        {
                            meta && meta.code ?
                                !data ? 
                                    <p className='text-muted'>{meta.message}</p>
                                : this.generateList(data)
                            : null                            
                        }
                    </div>
                    { is_loading || !meta ? <Loader /> : null }
                    <div className='row m-10' />
                </div>
            </div>
        )
    }
}

NewsBox.defaultProps = {
    subtitle: true
}