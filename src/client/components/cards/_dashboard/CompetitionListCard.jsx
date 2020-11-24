import React from "react"
import { epochToRelativeTime } from "../../../helpers/dateTime"

// components
import { Link } from "react-router-dom"
import Label from "../../Label"

const CompetitionListCard = props => {
  const { n } = props
  const linkEdit = `/${
    props.type == "super" ? "super" : "dashboard"
  }/competition/update/${n.id}`
  return (
    <div className="competition-items">
      <div className="item">
        <div className="item__left">
          <h4>
            <Link to={linkEdit}>{n.title}</Link>
          </h4>
          <p>
            <span>Dipost {epochToRelativeTime(n.created_at)}</span> oleh{" "}
            <Link
              title={n.author.username}
              to={`/dashboard/user/${n.author.username}`}
            >
              {n.author.username}
            </Link>
            ,
            {n.created_at < n.updated_at
              ? ` update terakhir ${epochToRelativeTime(n.updated_at)}`
              : " belum ada update"}
            <br />
            Kategori{" "}
            <a href={`/browse/${n.main_category.name}`} target="_blank">
              {n.main_category.name}
            </a>
            -
            <a
              href={`/browse/${n.main_category.name}/${n.sub_category.name}`}
              target="_blank"
            >
              {n.sub_category.name}
            </a>
          </p>

          {/* competition label */}
          {n.is_draft ? <Label type="gray">draft</Label> : null}
          {n.is_garansi ? <Label type="blue">garansi</Label> : null}
          {n.is_mediapartner ? <Label type="green">media partner</Label> : null}
          {n.is_support ? <Label type="green">support</Label> : null}
          <Label type="ref">
            {n.is_berakhir
              ? n.sisapengumuman != "berakhir"
                ? `pengumuman ${epochToRelativeTime(n.announcement_at)}`
                : "berakhir"
              : `deadline ${epochToRelativeTime(n.deadline_at)}`}
          </Label>
          {/* end of competition label */}
        </div>
        <div className="item__right">
          {/* stats count */}
          <div className="item__right-item">
            <h4
              style={{
                color: n.content.split(" ").length < 300 ? "#cf3030" : "inherit"
              }}
              title="total kata dalam deskripsi"
            >
              <span>
                <i className="fa fa-file" />
                &nbsp;
                {n.content.split(" ").length}
              </span>
            </h4>
          </div>{" "}
          <div className="item__right-item">
            <h4 title="total views">
              <span>
                <i className="fa fa-eye" />
                &nbsp;
                {n.stats.views}
              </span>
            </h4>
          </div>
          {/* end of stats count */}
          {/* dropdown menus */}
          <div className="item__right-item">
            <div className="dropdown">
              <a
                className="btn btn-sm dropdown-button fa fa-ellipsis-v"
                title="options"
                href="#"
                onClick={e => e.preventDefault()}
                data-target={`menu-${n.id}`}
              />
              <div className="dropdown-items" id={`menu-${n.id}`}>
                <ul>
                  <li>
                    <a
                      target="_blank"
                      href={`/competition/${n.id}/regulations/${n.nospace_title}`}
                    >
                      Preview
                    </a>
                  </li>
                  <li>
                    <Link to={linkEdit}>Ubah</Link>
                  </li>
                  <li>
                    <a onClick={e => e.preventDefault()} href="#">
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

export default CompetitionListCard
