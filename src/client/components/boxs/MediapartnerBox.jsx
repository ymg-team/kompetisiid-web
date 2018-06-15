import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { truncate } from 'string-manager'
import Loader from '../preloaders/GlobalLoader'

export default class MediapartnerBox extends Component {
  generateList() {
    const { data } = this.props
    return data.map((n, key) => {
      return (
        <div key={key} className="row">
          <div className="col-md-12">
            <div className="card-mediapartner">
              <div className="thumbnails">
                <img src={n.poster.small} />
              </div>
              <div className="details">
                <span className="categories">
                  <Link className="muted" to={`/browse/${n.main_category.name}`}>
                    {n.main_category.name}
                  </Link>,&nbsp;
                  <Link className="muted" to={`/browse/${n.main_category.name}/${n.sub_category.name}`}>
                    {n.sub_category.name}
                  </Link>
                </span>
                <Link
                  to={`/competition/${n.id}/regulations/${
                    n.nospace_title
                  }`}
                >
                  <h3>{n.title}</h3>
                </Link>
                <small>
                  Dipasang{' '}
                  <Link to={`/user/${n.author.username}`}>
                    {n.author.username}
                  </Link>
                </small>
                <br />
                <span>{truncate(n.sort, 300, '...')}</span>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    const { status, message } = this.props
    return (
      <div>
        <div className="col-md-12">
          <div className="col-md-8 col-md-push-2 col-lg-6 col-lg-push-3">
            <div className="row">
              <div className="media-partner align-center">
                <h2 className="big-text">Media Partner KI</h2>
                <span>
                  KI juga ikut berperan sebagai media partner berbagai kompetisi
                  di Indonesia.{' '}
                </span>
              </div>
            </div>
            {status ? (
              status === 200 ? (
                this.generateList()
              ) : (
                <p className="text-muted">{message}</p>
              )
            ) : (
              <Loader />
            )}
          </div>
        </div>
        <div className="col-md-12">
          <div className="col-md-8 col-md-push-2 col-lg-6 col-lg-push-3">
            <Link
              className="btn btn-black btn-fullwidth"
              style={{ marginBottom: 40 }}
              to={`/browse?mediapartner=1`}
            >
              <strong>Selengkapnya</strong>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
