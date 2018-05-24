import React from 'react'
import Tags from '../buttons/CompetitionTags'
import { textParser } from '../../helpers/String'

export default (props) => {
    const {html, encid, nospace_title} = props
    return(
        <div>
            <h2>Peraturan kompetisi</h2>
            <p className="text-muted">Sebelum mengikuti kompetisi ini, wajib untuk membaca dan mentaati setiap peraturan yang berlaku</p>
            <hr />
            <article dangerouslySetInnerHTML={{__html: textParser(html)}} />
            <br />
            <a target='_blank' href={`/competition/${encid}/source/${nospace_title}`}>kunjungi website kompetisi</a>
            <hr />
            <Tags tags={props.tags} />
        </div>
    )
}
