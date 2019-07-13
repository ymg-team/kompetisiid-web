import React from "react"
import Styled from "styled-components"
import { connect } from "react-redux"
import { softGray } from "../../../../style/colors"
import { deleteAnnouncement } from "../../competition/actions"
import swal from "sweetalert"

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

  removeHandler(key) {
    swal({
      title: `Hapus Pengumuman`,
      text: "Apakah kamu yakin ingin menghapus pengumuman ini",
      buttons: true,
      icon: "warning",
      dangerMode: true,
      buttons: ["Tidak", "Ya, Hapus"],
    }).then(value => {
      if (value) {
        console.log("deleted...")
        this.props.dispatch(deleteAnnouncement({
          competition_id: this.props.match.params.id,
          key
        }))
      }
    })
  }

  render() {
    const { loading } = this.state
    const { session } = this.props
    const competitionId = this.props.match.params.id
    const competitionData = this.props.competition[competitionId].data
    const tabContents = [
      {
        text: "Peraturan",
        target: ["moderator", "admin"].includes(session.level)
          ? `/super/competition/update/${competitionId}`
          : `/dashboard/competition/update/${competitionId}`
      },
      {
        text: "Pengumuman",
        count: competitionData.announcement.length || 0,
        is_active: true,
        target: ["moderator", "admin"].includes(session.level)
          ? `/super/competition/update/${competitionId}/announcements`
          : `/dashboard/competition/update/${competitionId}/announcements`
      }
    ]

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
            text="Berikut adalah daftar pengumuman yang telah dirilis kepada para pengunjung dan peserta kompetisi. Penyelenggara hanya bisa menambah dan menghapus kompetisi. Sedangkan untuk kompetisi dari sistem tidak bisa dihapus."
          />
          {/* announcements list */}
          {competitionData.announcement.length > 0 ? (
            competitionData.announcement.map((n, key) => {
              return (
                <div className="announcements-list" key={key}>
                  <small className="text-muted">
                    {n.tgl} oleh {n.by}
                  </small>
                  <br />
                  {n.data}
                  {n.by != "sistem" ? (
                    <Button
                      className="btn-remove-announcement"
                      size="small"
                      color="red"
                      onClick={() => this.removeHandler(key)}
                    >
                      x
                    </Button>
                  ) : null}
                </div>
              )
            })
          ) : (
            <p>Belum ada pengumuman</p>
          )}
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
