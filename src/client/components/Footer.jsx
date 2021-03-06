import React, { useEffect, useState } from "react"
import Styled from "styled-components"
import { Colors } from "../../config/style"

// components
import { Link } from "react-router-dom"

const FooterWrapper = Styled.footer`
  a {
    color: ${Colors.mainWhite};
    text-decoration: none;
    &:hover {
      color: ${Colors.softGray};
    }
  }

  .footer_content {
    margin-bottom: 50px;
    ul.vertical-menu li {
      margin-left: 0;
      margin-bottom: 7px;
    }
    strong.title {
      display: block;
    }
  }
`

const FooterThanks = Styled.div`
  &.footer-thanks {
    img.footer-thanks_img {
      padding: 0 20px 20px;
    }
  }
`

const FooterTop = Styled.div`
  background-color: ${Colors.mainBlack};
  color: ${Colors.softGray};
  padding: 10px;
  .footer-copyright {
    img.footer-copyright-logo  {
      width: 40px;
      float: left;
      padding-right: 10px;
      padding-bottom: 10px;
    }
    .footer-copyright-text {
      display: block;
      float: left;
      line-height: 1.3;
    }
  }
  .social-media {
    font-size: 23px;
    a {
      padding: 5px;
    }
  }
    
    
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

const Footer = props => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.__data__.User && window.__data__.User.session.id) {
        setIsLogin(true)
      }
    }
  }, [])

  return (
    <FooterWrapper>
      <FooterThanks className="col-md-12 footer-thanks align-center">
        <br />
        <h3>TERIMAKASIH</h3>
        <a
          href="https://www.domainesia.com/?aff=585"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            className="footer-thanks_img"
            src="https://res.cloudinary.com/dhjkktmal/image/upload/v1561894898/kompetisi-id/referral/domainesia.png"
            alt="Domainesia"
          />
        </a>
        <a
          href="https://m.do.co/c/e4eacf5d20a5"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            className="footer-thanks_img"
            src="https://res.cloudinary.com/dhjkktmal/image/upload/v1561894898/kompetisi-id/referral/digitalocean.png"
            alt="Digital Ocean"
          />
        </a>
      </FooterThanks>
      <FooterTop className="col-md-12 footer">
        {/* <footer> */}
        <div className="container">
          <div className="row">
            <div className="col-md-6 footer_content">
              <p>
                <strong className="title">Tentang Kami</strong>
              </p>
              Kami adalah sebuah platform kompetisi untuk berbagai macam
              kompetisi yang diadakan di Indonesia untuk selanjutnya dipanggil
              'KI'. Dipersembahkan oleh Yussan Media Group. Penyelenggara dapat
              menggunakan KI sebagai media publikasi, media partner ataupun
              kerja sama untuk kompetisi yang mereka adakan. Peserta dapat
              menjelajahi dan mengikuti berbagai kategori kompetisi di KI dan
              semoga menjadi pemenang.
            </div>
            <div className="col-md-3 footer_content">
              <p>
                {" "}
                <strong className="title">Lebih Lengkap</strong>
              </p>
              <ul className="vertical-menu">
                <li>
                  <Link to="/news/TXpVPQ/About">Apa itu Kompetisi Id</Link>
                </li>
                <li>
                  <Link to="/news/TVRnPQ/Term-Of-Use">Aturan Penggunaan</Link>
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
                  <Link to="/download/android">Download Android App</Link>
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
            <div className="col-md-3 footer_content">
              <p>
                {" "}
                <strong className="title">Navigasi</strong>
              </p>
              <ul className="vertical-menu">
                <li>
                  <Link to="/add">Pasang kompetisi</Link>
                </li>
                <li>
                  <Link to="/news">Kabar kompetisi</Link>
                </li>
                <li>
                  <Link to="/browse">Jelajah kompetisi</Link>
                </li>
                <li>
                  <Link to="/calendar">Kalender kompetisi</Link>
                </li>
                <li>
                  <Link to="/categories">Kategori</Link>
                </li>
                {!isLogin ? (
                  <li>
                    <Link to="/login">Login / register</Link>
                  </li>
                ) : null}
              </ul>
              <p />
            </div>
          </div>
          <hr style={{ borderTop: "1px solid #656565" }} />
          <div className="row">
            <div
              style={{ padding: "10px 0" }}
              className="col-md-6 col-xs-12 footer-copyright"
            >
              <img
                className="footer-copyright-logo"
                src="/assets/4.2/img/icon-128x128.png"
                alt="kompetisi id icon"
              />
              <small className="footer-copyright-text">
                &copy; 2013 - {new Date().getFullYear()} by Yussan Media Group
                <br />
                DIY, Indonesia
              </small>
            </div>
            <div style={{ padding: "10px 0" }} className="col-md-6 col-xs-12">
              <ul className="horizontal-menu pull-right social-media">
                <li>
                  <a
                    href="https://wa.me/6285156934428?text=Ada%20pertanyaan%20seputar%20produk%20Yussan%20Media%20Group%2C%20bisa%20disini."
                    target="_blank"
                    rel="noreferer noopener"
                  >
                    <i className="fab fa-whatsapp" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/kompetisiid"
                    target="_blank"
                    rel="noreferer noopener"
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/_kompetisiid"
                    target="_blank"
                    rel="noreferer noopener"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/kompetisiid"
                    target="_blank"
                    rel="noreferer noopener"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li>
                  <a href="/feed" target="_blank" rel="noreferer noopener">
                    <i className="fa fa-rss" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* </footer> */}
      </FooterTop>
      <FooterBottom className="col-md-12 poweredby">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              Powered by{" "}
              <a
                href="https://byymg.com"
                rel="noopener noreferer"
                target="_blank"
              >
                <img
                  src="/assets/4.2/img/ymg-icon-small.png"
                  alt="Yussan Media Group Small Icon"
                />
              </a>
            </div>
          </div>
        </div>
      </FooterBottom>
    </FooterWrapper>
  )
}

export default Footer
