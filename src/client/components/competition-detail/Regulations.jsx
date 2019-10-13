import React from 'react'
import Tags from '../buttons/CompetitionTags'
import { textParser } from '../../helpers/String'

export default class Regulation extends React.Component {
  render() {

    // get all image inside .competition-regulator
    setTimeout(() => {
        const ImgEl = document.querySelectorAll(".competition-regulation img")
        // ref: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
        for(let n of ImgEl) {
          n.className = "image-modal-target"
        }
    }, 1000)

    return (
      <div className="competition-regulation">
        <h2>Peraturan kompetisi</h2>
        <p className="text-muted">
          Sebelum mengikuti kompetisi ini, wajib untuk membaca dan mentaati setiap
          peraturan yang berlaku
        </p>
        <hr />
        <article dangerouslySetInnerHTML={{ __html: textParser(this.props.html) }} />
        <br />
        <a target="_blank" rel="nofollow" href={`/exit?to=${this.props.link_source}`}>
          kunjungi website kompetisi
        </a>
        <hr />
        <Tags tags={this.props.tags} />
      </div>
    )
  }
}
