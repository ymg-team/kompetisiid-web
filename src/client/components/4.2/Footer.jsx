import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
    <span>    
        <div className='col-md-12 footer'>
            <footer>
                <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <p><strong className='title'>Tentang Kami</strong></p>
                        Kami adalah sebuah platform kompetisi untuk berbagai macam kompetisi yang diadakan di Indonesia untuk selanjutnya dipanggil 'KI'. Dipersembahkan oleh ID More. Penyelenggara dapat menggunakan KI sebagai media publikasi, media partner ataupun kerja sama untuk kompetisi yang mereka adakan. Peserta dapat menjelajahi dan mengikuti berbagai kategori kompetisi di KI dan semoga menjadi pemenang.
                    </div>
                    <div className='col-md-3'>
                        <p> <strong className='title'>Lebih Lengkap</strong>
                        </p><ul className='vertical-menu'>
                            <li><Link to='/news/TXpVPQ/About'>Apa itu KompetisiIndonesia</Link></li>
                            <li><Link to='/news'>Berita terbaru</Link></li>
                            <li><a target='_blank' href='https://goo.gl/forms/kMGGZQXJCjoyKThj1'>Hubungi kami</a></li>
                            <li><Link to='/careers'>Karir</Link></li>
                        </ul>
                        <p />
                    </div>
                    <div className='col-md-3'>
                        <p> <strong className='title'>Navigasi</strong>
                        </p><ul className='vertical-menu'>
                            <li><Link to='/add'>Pasang kompetisi</Link></li>
                            <li><Link to='/news'>Berita</Link></li>
                            <li><Link to='/browse'>Jelajah kompetisi</Link></li>
                            <li><Link to='/categories'>Kategori</Link></li>
                            <li><Link to='/login'>Login / register</Link></li>
                        </ul>
                        <p />
                    </div>
                </div>
                <hr style={{borderTop: '1px solid #656565'}} />
                <div className='row vertical-center'>
                    <div className='col-md-6 footer-copyright'>
                        <img className='footer-copyright-logo' src='/assets/4.2/img/icon-128x128.png' title='kompetisi indonesia icon' />
                        <small className='footer-copyright-text'>&copy; 2013 - { (new Date()).getFullYear() } - now by Kompetisi Indonesia<br />DIY, Indonesia</small></div>
                    <div className='col-md-6'>
                    <ul className='horizontal-menu pull-right social-media'>
                        <li><a href='https://facebook.com/kompetisiid' target='_blank'><i className='fa fa-facebook' /></a></li>
                        <li><a href='https://twitter.com/_kompetisiid' target='_blank'><i className='fa fa-twitter' /></a></li>
                        <li><a href='https://instagram.com/kompetisiid' target='_blank'><i className='fa fa-instagram' /></a></li>
                        <li><a href='/feed' target='_blank'><i className='fa fa-rss' /></a></li>
                    </ul>
                    </div>
                </div>
                </div>
            </footer>
        </div>
        <div className='col-md-12 poweredby'>
            <div className='container'>
                <div className='row'><div className='col-md-12'>Powered by <a href='https://byidmore.com' target='_blank'><img src='/assets/4.2/img/icon-byidmore.png' title='idmore icon' /></a></div></div>
            </div>
        </div>
    </span>
)
