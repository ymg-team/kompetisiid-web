import React from 'react'

const SubHeader = (props) => (
    <div style={{textAlign: props.text_center ? 'center' : 'left'}} className='col-md-12 filter-jelajah'>
        <div className='container'>
            <div className='row no-margin'>
            <h1>{props.title}</h1>
            <p className='text-muted'>{props.desc}</p>
            </div>
        </div>
    </div>
)

export default SubHeader