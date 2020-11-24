import React, { Component } from "react"
import { Link } from "react-router-dom"
import Label from "../Label"

class TabCompetition extends Component {
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
          <div className="row">
            <div className="col-md-10 col-md-push-1">
              <div className="tab-competition">
                <ul className="horizontal-menu">
                  {tab.map((n, key) => (
                    <li
                      key={key}
                      className={this.props.active - 1 == key ? "active" : ""}
                    >
                      <Link
                        to={`/competition/${this.props.data.id}/${tab[key].link}/${this.props.data.nospace_title}`}
                      >
                        {n.name}
                        &nbsp;
                        {/* count announcements */}
                        {n.name == "pengumuman" && n_pengumuman > 0 ? (
                          <Label
                            type={
                              this.props.active - 1 == key ? "red" : "white"
                            }
                            text={n_pengumuman}
                          />
                        ) : null}
                        {/* count contacts */}
                        {n.name == "kontak" && n_kontak > 0 ? (
                          <Label
                            type={
                              this.props.active - 1 == key ? "red" : "white"
                            }
                            text={n_kontak}
                          />
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
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
    name: "hadiah",
    link: "prizes"
  },
  {
    name: "peraturan",
    link: "regulations"
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
