import React from 'react'
import { getCompetitionStatus } from '../../helpers/DateTime'
import { alert } from '../Alert'

export default props => {
  const { is_ended, is_waiting } = getCompetitionStatus(props.data.deadline_at, props.data.announcement_at)
  return (
    <a
      id={props.id}
      style={{ marginRight: '10px' }}
      onClick={() => {
        if(is_ended || is_waiting) alert(true, 'Pendaftaran sudah ditutup', 'error')
      }}
      href={
        is_ended
          ? 'javascript:;'
          : `/competition/${props.data.id}/${
              props.data.ikuti ? 'join' : 'source'
            }/${props.data.nospace_title}`
      }
      target="_blank"
      className={`btn btn-join btn-lg ${
        is_ended || is_waiting == 'berakhir' ? 'btn-gray' : 'btn-green'
      }`}
    >
      {is_ended || is_waiting ? 'Pendaftaran Ditutup' : 'Ikuti Kompetisi'}
    </a>
  )
}
