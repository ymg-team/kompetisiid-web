import React from 'react'
import { Link } from 'react-router-dom'
import { Fullscreen } from './Fullscreen'

export default props => {
  const { url } = props
  return (
    <Fullscreen className="bg-gray-soft">
      <div className="container">
        <div className="row redirect">
          <div className="redirect-content bg-white align-center">
            <p>
              Kamu akan meninggalkan kompetisi.id .
              <br />
              Jika ingin melanjutkan, silahkan klik dibawah ini{' '}
              <strong>
                <a rel="nofollow" href={url}>
                  klik disini
                </a>
              </strong>
            </p>
            <small>
              <Link to="/">Kembali ke Home</Link>
              {' | '}
              <Link to="/browse">Jelajah Kompetisi</Link>
              {' | '}
              <Link to="/news">Kabar kompetisi</Link>
            </small>
          </div>
        </div>
      </div>
    </Fullscreen>
  )
}
