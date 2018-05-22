import React from 'react'
import { Link } from 'react-router-dom'
import Styled from 'styled-components'
import * as Colors from '../../../style/colors'

export const CardCompetitionStyled = Styled.div`
  .card-competition {
    &:hover {
      cursor: pointer;
      border: 1px solid #FFF;
      box-shadow: 1px 4px 4px ${Colors.softGray};
    }
    
    border: 1px solid #FFF;
    margin-bottom: 30px
    background-color: #FFF;

    a {
      text-decoration: none;
    }

    .card-competition--inside {
      padding: 20px;
      h3 {
        font-weight: 500;
        margin: 10px 0 0;
        height: 4.1em;
        overflow: hidden;
      }
      progress {
        width: 100%;
        margin: 20px 0;
        height: 5px;
        &[value] {
          -webkit-appearance: none;
          appearance: none;
          &::-webkit-progress-value {
            background-color: $color-green-dark;
          }
          &::-webkit-progress-bar {
            background-color: #eee;
            border-radius: 2px;
          }
        }
      }
      .types {
        min-height: 2em;
      }
      .meta > p {
        margin: 0;
      }
    }    

    .card-competition--poster {
      height: 200px;
      overflow: hidden;
      background-size: cover;
      background-position: center top;
      background-color: #f4f4f4;
      img {
        max-width: 100%;
      }
    }

  }
`

const LabelEnd = () => (
  <div
    style={{
      position: 'absolute',
      background: '#e64b3b',
      top: '85px',
      margin: '0 auto',
      padding: '10px',
      color: '#FFF',
      opacity: '1',
      left: '-25%',
      marginLeft: '50%',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '1.1px',
      zIndex: 1
    }}
  >
    kompetisi berakhir
  </div>
)

const CompetitionListCard = props => {
  const { n, size } = props
  const target = `/competition/${n.id_kompetisi}/regulations/${n.nospace_title}`
  const is_berakhir =
    n.sisadeadline == 'berakhir' && n.sisapengumuman == 'berakhir'
  return (
    <CardCompetitionStyled
      className={size === 'large' ? 'col-md-4' : 'col-md-3'}
    >
      {is_berakhir ? <LabelEnd /> : null}
      <div
        style={{ opacity: is_berakhir ? 0.5 : 1 }}
        className="card-competition"
      >
        <Link to={target}>
          <div className="card-competition--poster" style={{backgroundImage: `url(${n.poster.small})`}} />
        </Link>
        <div className="card-competition--inside">
          <div className="categories">
            <Link className="muted" to={`/browse/${n.mainkategori}`}>
              {n.mainkategori}
            </Link>,&nbsp;
            <Link
              className="muted"
              to={`/browse/${n.mainkategori}/${n.subkategori}`}
            >
              {n.subkategori}
            </Link>
          </div>
          <Link to={target}>
            <h3>{n.title}</h3>
          </Link>
          <span>dipasang</span>{' '}
          <Link className="muted" to={`/user/${n.author.username}`}>
            {n.author.username}
          </Link>
          <progress value={setProgressBar(n.deadline_at)} max={100} />
          <div className="types">
            {n.is_garansi ? (
              <span
                title="kompetisi sudah diverifikasi keberadaannya oleh kru KI"
                className="label label-green"
              >
                Garansi
              </span>
            ) : null}
            {n.is_mediapartner ? (
              <span
                title="KI berlaku sebagai media partner di kompetisi ini"
                className="label label-blue"
              >
                Media Partner
              </span>
            ) : null}
            {n.is_support ? (
              <span
                title="kompetisi ini bisa diikuti melelui KI"
                className="label label-blue"
              >
                Support
              </span>
            ) : null}
            {is_berakhir ? (
              <span
                title="kompetisi ini telah berakhir"
                className="label label-red"
              >
                Berakhir
              </span>
            ) : null}
            {n.sisadeadline == 'berakhir' && n.sisapengumuman != 'berakhir' ? (
              <span
                title="kompetisi ini telah berakhir"
                className="label label-orange"
              >
                <i className="fa fa-flag" /> Sedang berlangsung
              </span>
            ) : null}
          </div>
          <div className="meta">
            <p>
              <strong>{n.total_hadiah}</strong>
              <span className="text-muted">&nbsp;total hadiah</span>
            </p>
            {n.sisadeadline == 'berakhir' && n.sisapengumuman == 'berakhir' ? (
              <p>
                <strong>Kompetisi telah berakhir</strong>
              </p>
            ) : n.sisadeadline == 'berakhir' &&
            n.sisapengumuman != 'berakhir' ? (
              <p>
                <strong>{n.sisapengumuman} lagi</strong>{' '}
                <span className="text-muted">Pengumuman pemenang</span>
              </p>
            ) : (
              <p>
                <strong>{n.sisadeadline} lagi</strong>{' '}
                <span className="text-muted">Deadline pendaftaran</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </CardCompetitionStyled>
  )
}

export function setProgressBar(deadline) {
  let today, interval, progress

  // set interval days
  today = new Date()
  deadline = new Date(deadline)
  interval = deadline.getTime() - today.getTime()
  interval = Math.ceil(interval / (1000 * 3600 * 24))

  //set progress precentage
  if (interval > 0 && interval <= 100) {
    progress = 100 - interval
  } else if (interval > 100) {
    progress = 1
  } else {
    progress = 100
  }

  return progress
}

export default CompetitionListCard