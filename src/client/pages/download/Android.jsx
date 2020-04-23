import React from "react"
import Styled from "styled-components"

// components
import Helmet from "../../components/Helmet"

const DownloadAndroidStyled = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
`

class DownloadAndroid extends React.Component {
  render() {
    return (
      <DownloadAndroidStyled>
        <Helmet
          title="Download Android App Kompetisi Id"
          description="Agar lebih update seputar Kompetisi Id, yuk download aplikasi Kompetisi Id untuk android ini"
        />
        <div className="col-md-4 col-xs-12">
          <h1>Download Android App</h1>
          <p>
            Kompetisi Android juga tersedia dalam Android App, silahkan klik
            link dibawah ini untuk download dan melakukan instalasi.
          </p>
          <a
            target="_blank"
            rel="noopener noreferer"
            href="https://drive.google.com/file/d/1fBj-7nCXY7iis1Xf3atL3IwQp9RqNzpo/view"
          >
            Download Klik Disini (v1.1.0-beta)
          </a>

          <h2 className="m-t-2em">Changelogs</h2>
          <p>
            <strong>v1.1.0-beta</strong>
            <br />
            <ul>
              <li>add send request competition</li>
              <li>improve detail competition</li>
            </ul>
          </p>
        </div>
      </DownloadAndroidStyled>
    )
  }
}

export default DownloadAndroid
