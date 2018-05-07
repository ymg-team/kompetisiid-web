import React from 'react'
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
                <a rel="nofollow" href={url}>
                  klik disini
                </a>
              </p>
            </div>
          </div>
        </div>
    </Fullscreen>
  )
}
