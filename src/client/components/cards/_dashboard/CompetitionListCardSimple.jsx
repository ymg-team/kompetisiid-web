import React from "react"
import { epochToRelativeTime } from "../../../helpers/DateTime"

class CompetitionListCard extends React.Component {
  handleActionWaitingCompetition(action) {
    if (action === "accept") {
    } else if (action === "reject") {
    } else {
      console.warn("please provide an action!")
    }
  }

  render() {
    const { n } = this.props

    return (
      <div className="competition-items">
        <div className="item">
          <div className="item__left">
            <h4>
              <a
                title="ke halaman kompetisi"
                href={`/competition/${n.id}/regulations/${n.nospace_title}`}
                target="_blank"
              >
                {n.title}
              </a>
            </h4>
            <p className="text-muted" style={{ margin: 0 }}>
              <span>Dipost {epochToRelativeTime(n.created_at)}</span> oleh{" "}
              <a
                title={n.author.username}
                href={`/user/${n.author.username}`}
                target="_blank"
              >
                {n.author.username}
              </a>
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
            {n.is_garansi ? (
              <span className="label label-blue">garansi</span>
            ) : null}
            {n.is_mediapartner ? (
              <span className="label label-green">media partner </span>
            ) : null}
            {n.is_support ? (
              <span className="label label-green">support </span>
            ) : null}
            <span className="label label-red">
              {n.is_berakhir
                ? n.sisapengumuman != "berakhir"
                  ? `pengumuman ${epochToRelativeTime(n.announcement_at)}`
                  : "berakhir"
                : `deadline ${epochToRelativeTime(n.deadline_at)}`}
            </span>
            {/* end of competition label */}
          </div>
          <div className="item__right">
            <div className="item__right-item">
              <h4 className="text-muted" title="total views">
                <span>
                  <i className="fa fa-eye" />
                  &nbsp;
                  {n.stats.views}
                </span>
              </h4>
            </div>
            {/* end of stats count */}
          </div>
        </div>
      </div>
    )
  }
}

export default CompetitionListCard
