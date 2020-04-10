import React from "react"
import Styled from "styled-components"

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
        <div className="col-md-4 col-xs-12">
          <h1>Download Android App</h1>
          <p>
            Kompetisi Android juga tersedia dalam Android App, silahkan klik
            link dibawah ini untuk download dan melakukan instalasi.
          </p>
          <a
            target="_blank"
            rel="noopener noreferer"
            href="https://drive.google.com/open?id=1aUcT8zIMHiEZ2tCXX9xwIt52cnbm3d9B"
          >
            Download Disini (update April 2020)
          </a>
        </div>
      </DownloadAndroidStyled>
    )
  }
}

export default DownloadAndroid
