import React from "react"
import Styled from "styled-components"
import { connect } from "react-redux"
import { softGray } from "../../../../style/colors"

import Helmet from "../../../components/Helmet"
import HeaderDashboard from "../../../components/cards/HeaderDashboard"
import Textarea from "../../../components/form/Textarea"
import Submit from "../../../components/form/Submit"
import Button from "../../../components/buttons/"
import Tab from "../../../components/navigations/Tab"
import TitleLevel2Box from "../../../components/boxs/TitleLevel2"

const CompetitionAnnouncementStyled = Styled.div`
  .announcements-list {
    padding: 5px;
    position: relative;
    &:hover {
      background-color: ${softGray};
    }
    .btn-remove-announcement {
      position: absolute;
      right: 5px;
      top: 50%;
      margin-top: -11px;
    }
  }
`

class CompetitionAnnouncement extends React.Component {
  state = {}

  render() {
    const { loading } = this.state
    const { session } = this.props
    const competitionId = this.props.match.params.id
    const competitionData = this.props.competition[competitionId].data
    let tabContents = []


    if (["moderator", "admin"].includes(session.level)) {
      tabContents = [
        {
          text: "Peraturan",
          target: `/super/competition/update/${competitionId}`
        },
        {
          text: "Pengumuman",
          count: competitionData.announcement.length || 0,
          is_active: true,
          target: `/super/competition/update/${competitionId}/announcements`
        }
      ]
    } else {
      tabContents = [
        {
          text: "Peraturan",
          target: `/dashboard/competition/update/${competitionId}`
        },
        {
          text: "Pengumuman",
          count: competitionData.announcement.length || 0,
          is_active: true,
          target: `/dashboard/competition/update/${competitionId}/announcements`
        }
      ]
    }

    const title = "Pengumuman Kompetisi"
    return (
      <CompetitionAnnouncementStyled>
        <Helmet title={title} />
        <HeaderDashboard
          title={title}
          text="Kamu hanya bisa menambah dan menghapus pengumuman, pastikan telah dicek secara benar sebelum submit."
          noBorder
        />

        {/* tabs */}
        <Tab tabs={tabContents} />
        {/* end of tabs */}

        <div className="col-md-8 no-padding">
          {/* add announcement */}
          <form className="form-ki" action="javascript:;" method="post">
            <TitleLevel2Box
              title="Tambah Pengumuman"
              text="Pengumuman yang akan kamu tambahkan tidak bisa diedit, tapi kamu bisa menghapusnya kapan pun. (kecuali pengumuman otomatis dari sistem)"
            />
            <Textarea
              label="Tulis pengumuman disini"
              name="announcement"
              id="input-announcement"
              value={this.state.announcement || ""}
              validate={this.state.announcement_validate || {}}
              required={true}
              max={300}
              autofocus
              setState={(n, cb) => this.setState(n, cb)}
            />
            <Submit
              disabled={loading}
              text={loading ? "loading..." : "Tambah Pengumuman"}
              action={() => {}}
              setState={(n, cb) => this.setState(n, cb)}
              requiredInputs={["announcement"]}
            />
          </form>
          <br />
          {/* end of add announcement */}
          <TitleLevel2Box
            title="Daftar Pengumuman"
            text="Berikut adalah daftar pengumuman yang telah dirilis kepada para pengunjung dan peserta kompetisi."
          />
          {/* announcements list */}
          <div className="announcements-list">
            <small className="text-muted">
              2019-05-20 20:09:45 oleh sistem
            </small>
            <br />
            Data kompetisi telah diupdate
            <Button
              className="btn-remove-announcement"
              size="small"
              color="red"
            >
              x
            </Button>
          </div>
          <div className="announcements-list">
            <small className="text-muted">
              2019-05-20 20:09:45 oleh sistem
            </small>
            <br />
            Data kompetisi telah diupdate
          </div>
          {/* end of nnouncements list */}
        </div>
      </CompetitionAnnouncementStyled>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.Kompetisi.categories,
    competition: state.Kompetisi.detail,
    others: state.Others,
    session: state.User.session
  }
}

export default connect(mapStateToProps)(CompetitionAnnouncement)
