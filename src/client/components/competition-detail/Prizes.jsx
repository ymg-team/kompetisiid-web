import React from 'react'

export default (props) => (
    <div>
        <h2>Hadiah kompetisi</h2>
        <p className="text-muted">Berikut adalah hadiah-hadiah yang bisa dimenangkan para pemenang, semoga beruntung</p>
        <hr />
        <article dangerouslySetInnerHTML={{__html: props.html}} />
    </div>
)
