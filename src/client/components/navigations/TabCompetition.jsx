import React, { Component } from "react"
import Styled from "styled-components"
import { Link } from "react-router-dom"
import BtnJoin from "../buttons/BtnJoin"
// import { pushScript } from "../../helpers/DomEvents"

class TabCompetition extends Component {
  componentDidMount() {

    // // disquss count sdk
    // pushScript("//kompetisiindonesia.disqus.com/count.js", {
    //   id: "dsq-count-scr"
    // })

    // setTimeout(() => {
    //   this.resetDisqusCount()
    // }, 2000)
  }

  // resetDisqusCount = () => {
  //   console.log("reset disqus count...")
  //   if (window.DISQUSWIDGETS) DISQUSWIDGETS.getCount({ reset: true })
  // }

  render = () => {
    const n_pengumuman = this.props.data
      ? this.props.data.announcement.length
      : 0
    const n_kontak = this.props.data ? this.props.data.contacts.length : 0

    return (
      <div
        id="container-competition-tab"
        className="row no-margin container-competition-tab"
      >
        <div className="container">
          <div className="roe">
            <div className="col-md-10 col-md-push-1">
              <div className="tab-competition">
                <ul className="horizontal-menu">
                  {tab.map((n, key) => (
                    <li
                      key={key}
                      className={this.props.active - 1 == key ? "active" : ""}
                    >
                      <Link
                        to={`/competition/${this.props.data.id}/${
                          tab[key].link
                        }/${this.props.data.nospace_title}`}
                      >
                        {n.name}
                        &nbsp;
                        {/* count announcements */}
                        {n.name == "pengumuman" && n_pengumuman > 0 ? (
                          <div
                            className={`label label-small ${
                              this.props.active - 1 == key
                                ? "label-red"
                                : "label-white"
                            }`}
                          >
                            {n_pengumuman}
                          </div>
                        ) : null}
                        {/* count contacts */}
                        {n.name == "kontak" && n_kontak > 0 ? (
                          <div
                            className={`label label-small ${
                              this.props.active - 1 == key
                                ? "label-red"
                                : "label-white"
                            }`}
                          >
                            {n_kontak}
                          </div>
                        ) : null}
                        {/* count comments */}
                        {/* {n.name == "diskusi" ? (
                          <div
                            // data-disqus-identifier={this.props.link}
                            data-disqus-url={this.props.link}
                            className={`disqus-comment-count label label-small ${
                              this.props.active - 1 == key
                                ? "label-red"
                                : "label-white"
                            }`}
                          >
                            0
                          </div>
                        ) : null} */}
                      </Link>
                    </li>
                  ))}
                </ul>
                <BtnJoin id="btn-join" {...this.props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TabCompetition

export const tab = [
  {
    name: "peraturan",
    link: "regulations"
  },
  {
    name: "hadiah",
    link: "prizes"
  },
  {
    name: "pengumuman",
    link: "annoucements"
  },
  {
    name: "diskusi",
    link: "discussions"
  },
  {
    name: "kontak",
    link: "contacts"
  },
  {
    name: "share",
    link: "share"
  }
]
