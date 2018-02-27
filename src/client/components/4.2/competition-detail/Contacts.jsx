import React from 'react'
import { generateLink } from '../../../helpers/LinkGenerator'

const Type = [
    {icon:''},
    {icon:'fa fa-chrome'},
    {icon:'fa fa-facebook'},
    {icon:'fa fa-twitter'},
    {icon:'fa fa-instagram'},
    {icon:'fa fa-google-plus'},
    {icon:'fa fa-envelope-o'},
    {icon:'fa fa-map-marker'},
    {icon:'fa fa-youtube-play'},
    {icon:'fa fa-phone'}
]

export default (props) => (
    <div>
        <h2>Kontak kompetisi</h2>
        <p className="text-muted">Ada pertanyaan atau ingin info lebih lanjut langsung dari penyelenggara, silahkan sampaikan melalui  kontak dibawah ini.</p>
        <hr />
        {props.data && props.data.length > 0 ?
        props.data.map((n, key) => {
            return (
                <p key={key}>
                    <i className={Type[n.type].icon} />
                    {' '}
                    {
                        [1,2,3,4,8].includes(parseInt(n.type)) ?
                            generateLink(n.value, '_blank')
                        : n.value
                    }
                </p>
            )
        })
        : <p>kontak tidak tersedia</p>}
    </div>
)
