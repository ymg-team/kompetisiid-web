import React from 'react'

export default (props) => (
  <div>
    <h1>{props.title}</h1>
    <p className="text-muted">{props.text}</p>
  </div>
)