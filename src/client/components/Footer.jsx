import React, { Component } from "react"
import Styled from "styled-components"
import * as Color from "./styles/colors"

// components
import GAds from "../components/cards/GoogleAds"
import { Link } from "react-router-dom"

const FooterWrapper = Styled.div``

const FooterTop = Styled.div`
background-color: ${Color.BlackDark};
color: ${Color.GrayVerySoft};
padding: 10px;
`

const FooterBottom = Styled.div`
background: #000000;
color: #FFF;
text-align: right;
font-weight: bold;
padding: 5.5px;
img {
  width: 20px;
}
`

export default class Footer extends Component {
  componentDidMount() {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    return (
      <FooterWrapper>
        <FooterTop className="col-md-12 footer">
          <footer>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong className="title">Tentang Kami</strong>
                  </p>
                  Kami adalah sebuah platform kompetisi untuk berbagai macam
                  kompetisi yang diadakan di Indonesia untuk selanjutnya
                  dipanggil 'KI'. Dipersembahkan oleh ID More. Penyelenggara
                  dapat menggunakan KI sebagai media publikasi, media partner
                  ataupun kerja sama untuk kompetisi yang mereka adakan. Peserta
                  dapat menjelajahi dan mengikuti berbagai kategori kompetisi di
                  KI dan semoga menjadi pemenang.
                </div>
                <div className="col-md-3">
                  <p>
                    {" "}
                    <strong className="title">Lebih Lengkap</strong>
                  </p>
                  <ul className="vertical-menu">
                    <li>
                      <Link to="/news/TXpVPQ/About">
                        Apa itu KompetisiIndonesia
                      </Link>
                    </li>
                    <li>
                      <Link to="/news/TVRnPQ/Term-Of-Use">
                        Aturan Penggunaan
                      </Link>
                    </li>
                    <li>
                      <Link to="/news/TVRjPQ/Privacy-Policy">
                        Kebijakan Privasi
                      </Link>
                    </li>
                    <li>
                      <Link to="/news">Berita terbaru</Link>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        href="https://goo.gl/forms/kMGGZQXJCjoyKThj1"
                      >
                        Hubungi kami
                      </a>
                    </li>
                    <li>
                      <Link to="/careers">Karir</Link>
                    </li>
                  </ul>
                  <p />
                </div>
                <div className="col-md-3">
                  <p>
                    {" "}
                    <strong className="title">Navigasi</strong>
                  </p>
                  <ul className="vertical-menu">
                    <li>
                      <Link to="/add">Pasang kompetisi</Link>
                    </li>
                    <li>
                      <Link to="/news">Berita</Link>
                    </li>
                    <li>
                      <Link to="/browse">Jelajah kompetisi</Link>
                    </li>
                    <li>
                      <Link to="/categories">Kategori</Link>
                    </li>
                    <li>
                      <Link to="/login">Login / register</Link>
                    </li>
                  </ul>
                  <p />
                </div>
              </div>
              {/* gads */}
              <GAds adClient="ca-pub-4468477322781117" adSlot={5218613800} />
              {/* gads */}
              <hr style={{ borderTop: "1px solid #656565" }} />
              <div className="row vertical-center">
                <div className="col-md-6 footer-copyright">
                  <img
                    className="footer-copyright-logo"
                    src="/assets/4.2/img/icon-128x128.png"
                    title="kompetisi id icon"
                  />
                  <small className="footer-copyright-text">
                    &copy; 2013 - {new Date().getFullYear()} by Id More<br />DIY,
                    Indonesia
                  </small>
                </div>
                <div className="col-md-6">
                  <ul className="horizontal-menu pull-right social-media">
                    <li>
                      <a
                        href="https://facebook.com/kompetisiid"
                        target="_blank"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/_kompetisiid"
                        target="_blank"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://instagram.com/kompetisiid"
                        target="_blank"
                      >
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="/feed" target="_blank">
                        <i className="fa fa-rss" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </FooterTop>
        <FooterBottom className="col-md-12 poweredby">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                Powered by{" "}
                <a href="https://byidmore.com" target="_blank">
                  <img
                    src="/assets/4.2/img/icon-byidmore.png"
                    title="idmore icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </FooterBottom>
      </FooterWrapper>
    )
  }
}
