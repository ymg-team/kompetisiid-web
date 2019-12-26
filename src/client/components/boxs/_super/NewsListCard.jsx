import React from "react"
import { Link } from "react-router-dom"
import { epochToRelativeTime } from "../../../helpers/dateTime"

const NewsListCard = props => {
  const { data } = props
  return (
    <div className="competition-items">
      <div className="item">
        <div className="item__left">
          <h4>
            <Link to={`/super/news/${data.id}`}>{data.title}</Link>
          </h4>
          <p className="text-muted">
            <span>Dipost {epochToRelativeTime(data.created_at)} hari lalu</span>{" "}
            oleh {data.author.username}
          </p>
          {data.is_draft ? (
            <span className="label label-gray">draft</span>
          ) : null}
        </div>

        <div className="item__right">
          {/* dropdown menus */}
          <div className="item__right-item">
            <div className="dropdown">
              <a
                className="btn btn-sm dropdown-button text-muted fa fa-ellipsis-v"
                title="options"
                href="#"
                onClick={e => e.preventDefault()}
                data-target={`menu-${data.id}`}
              />
              <div className="dropdown-items" id={`menu-${data.id}`}>
                <ul>
                  <li>
                    <a
                      target="_blank"
                      href={`/news/${data.id}/${data.nospace_title}`}
                    >
                      Preview
                    </a>
                  </li>
                  <li>
                    <Link to={`/super/news/${data.id}`}>Ubah</Link>
                  </li>
                  <li>
                    <a onClick={(e) => e.preventDefault()} href="#">
                      Hapus
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* end of dropdown menus */}
        </div>
      </div>
    </div>
  )
}

export default NewsListCard
