import React, { Component } from "react"
import { pushScript } from "../../helpers/DomEvents"
export default class Discussions extends Component {
  componentDidMount() {
    // disquss js sdk
    pushScript("//kompetisiindonesia.disqus.com/embed.js")
    
    setTimeout(() => {
      this.resetDisqus()
    }, 1000)
  }

  componentWillReceiveProps() {

  }

  resetDisqus() {
    console.log("reset Disqus...")
    if (window.DISQUS) {
      DISQUS.reset({
        reload: true,
        config: function() {
          this.page.identifier = `${this.props.link}`
          this.page.url = this.props.link
          this.callbacks.onNewComment = [function(comment) {
            console.log("Thanks for comment...", comment.text)
            if (window.DISQUSWIDGETS) DISQUSWIDGETS.getCount({ reset: true })
          }]
        }
      })
    }
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
