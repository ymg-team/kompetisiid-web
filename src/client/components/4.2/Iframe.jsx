import React from 'react'

const Iframe = (props) => (
    <div className='row competition-iframe'>
        <iframe src={props.src} />
    </div>
)

export default Iframe