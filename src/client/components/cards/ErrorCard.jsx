import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => (
  <div className="fullheight">
    <div className="container error">
      <div className="col-md-4 col-md-push-4 col-sm-12">
        <h1>{props.code || 500}</h1>
        <h2>{props.message || 'Telah Terjadi Masalah'}</h2>
        <p>Jika anda tersesat, silahkan masuk ke <Link to='/browse'>Jelajah Kompetisi</Link>
            {''}
           untuk menemukan kompetisi lainnya atau kembali ke <Link to='/'>Halaman Utama</Link></p>
      </div>
    </div>
  </div>

)
