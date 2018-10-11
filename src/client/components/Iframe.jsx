import React from 'react'

export default (props) => (
  <div className='row competition-iframe'>
    <iframe src={props.src} />
  </div>
)
