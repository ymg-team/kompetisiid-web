import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Fullscreen } from './Fullscreen'

export default class Redirect extends Component {
  
  componentDidMount = () => {
    setTimeout(() => {
      location.href = this.props.url
    }, 1500)
  }
  
  render = () => {
    return (
      <Fullscreen className="bg-gray-soft">
        <div className="container">
          <div className="row redirect">
            <div className="redirect-content bg-white align-center">
              <p>
                Kamu akan meninggalkan kompetisi.id .
                <br />
                Jika redirect otomatis tidak jalan, silahkan klik dibawah ini{' '}
                <strong>
                  <a rel="nofollow" href={this.props.url}>
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
}
