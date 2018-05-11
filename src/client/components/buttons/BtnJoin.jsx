import React from 'react'

export default props => (
  <a
    id={props.id}
    style={{ marginRight: '10px' }}
    href={`/competition/${props.data.id_kompetisi}/${
      props.data.ikuti ? 'join' : 'source'
    }/${props.data.nospace_title}`}
    target="_blank"
    className={`btn btn-join btn-lg ${
      props.data.sisadeadline == 'berakhir' ? 'btn-gray' : 'btn-green'
    }`}
  >
    {props.data.sisadeadline == 'berakhir'
      ? 'Pendaftaran Ditutup'
      : 'Ikuti Kompetisi'}
  </a>
)
