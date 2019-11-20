import React from "react"
import { Fullscreen } from "../Fullscreen"
import { Link } from "react-router-dom"

const FullPageError = ({ message, code }) => {
  return (
    <Fullscreen className="error">
      <div className="error-box">
        <div className="error__code">
          <h1>{code || 500}</h1>
        </div>
        <div className="error__message">
          {message || "Sedang terjadi masalah"}
        </div>
        <div className="error__navigation">
          <Link to="/">Kembali ke home</Link>
          <Link to="/browse">Jelajah</Link>
          <Link to="/add">Pasang</Link>
          <Link to="/news">Berita</Link>
        </div>
      </div>
    </Fullscreen>
  )
}

export default FullPageError
