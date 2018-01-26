import React from 'react'
import {Link} from 'react-router'

const CompetitionTags = (props) => (
    <span>
        {props.tags ? 
        props.tags.map((n, key) => {
            return <Link className='btn btn-white' to={`/browse/tag/${n}`} key={key} href='javascript:;'>{n}</Link>
        })
        : <small className='text-muted'>tidak ada tags tersedia</small>}
    </span>
)

export default CompetitionTags