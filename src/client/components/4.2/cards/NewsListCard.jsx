import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
    const {n} = props
    const target = `/news/${n.id}/${n.nospace_title}`
    return(
        <div className='col-md-4'>
            <div className='card-competition no-border'>
                <Link to={target}>
                    <div className='card-competition--poster'>
                        <img src={n.image ? n.image.small : `/assets/4.2/img/slider/slider-2.png`} />
                    </div>
                </Link>
                <div className='card-competition--inside'>
                    <Link to={target}>
                        <h3>{n.title}</h3>
                        <small className='text-muted'>{n.created_at}</small>
                    </Link>
                    <br />
                    <small>
                        diposting oleh
                        {' '}
                        <Link to={`/user/${n.username}`}>{n.username}</Link>
                    </small>
                        <br />
                    <a className='muted' href='#'>
                        <img className='avatar' src={`/assets/4.2/img/default-avatar.jpg`} />
                    </a>
                </div>
            </div>
        </div>
    )
}
