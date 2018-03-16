import React from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
    const { error_code, error_msg } = props.route

    return (
        <section className='error'>
            <div className='error-box'>
                <div className='error__code'>
                    <h1>{error_code || 500}</h1></div>
                <div className='error__message'>{ error_msg || 'Sedang terjadi masalah' }</div>
                <div className='error__navigation'>
                    <Link to='/'>Kembali ke home</Link>
                    <Link to='/browse'>Jelajah</Link>
                    <Link to='/add'>Pasang</Link>
                    <Link to='/news'>Berita</Link>
                </div>
            </div>
        </section>
    )
}
