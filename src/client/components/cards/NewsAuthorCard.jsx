import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => (
    <div className="author">
        <Link to={`/user/${props.data.username}`}>
            <img className="avatar" src="/assets/4.2/img/default-avatar.jpg" />
            diposting oleh <strong>{props.data.username}</strong>
        </Link>
        <br />
        <span className="text-muted">{props.data.moto || ''}</span>
    </div>
)
