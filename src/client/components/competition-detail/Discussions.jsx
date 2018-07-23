import React, { Component } from "react"

export default class Discussions extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.resetDisqus()
    }, 1000)
  }

  resetDisqus() {
    if (window.DISQUS)
      DISQUS.reset({
        reload: true,
        config: function() {
          this.page.identifier = this.props.link
          this.page.url = this.props.link
        }
      })
  }

  render() {
    return (
      <div>
        <h2>Diskusi kompetisi</h2>
        <p className="text-muted">
          Untuk mendapatkan info lebih lanjut, mari sampaikan melalui menu
          diskusi ini. Diskusi bisa dijawab oleh peserta lain atau bahkan
          penyelenggara kompetisi sendiri.
        </p>
        <hr />
        <div id="disqus_thread" />
      </div>
    )
  }
}
