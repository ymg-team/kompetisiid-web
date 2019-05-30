import React from "react"
import { connect } from "react-redux"
import Styled from "styled-components"
import { submitSettingProfile } from "./actions"

// components
import Helmet from "../../components/Helmet"
import HeaderDashboard from "../../components/cards/HeaderDashboard"
import InputText from "../../components/form/InputText"
import Textarea from "../../components/form/Textarea"
import InputFile from "../../components/form/InputFile"
import BtnSubmit from "../../components/form/Submit"

const SettingProfileStyled = Styled.div`

`

class SettingProfile extends React.Component {
  state = {}

  componentDidMount() {
    const { session } = this.props
    if (session) {
      this.setState({
        username: session.username,
        fullname: session.fullname,
        address: session.address,
        avatar_preview: session.avatar.original
      })
    }
  }

  submitHandler() {
    let params = {
      fullname: this.state.fullname || "",
      address: this.state.address || ""
    }
    if (this.state.avatar) params.avatar = this.state.avatar

    return this.props.dispatch(submitSettingProfile(params))
  }

  componentWillReceiveProps(np) {
    if(np.submitResponse.status == 200) {
      setTimeout(() => {
        location.reload(true)
      }, 200)
    }
  }

  render() {
    return (
      <div>
        <Helmet title="Pengaturan Profil" />
        <HeaderDashboard title="Pengaturan Profil" text="this is setting page" />

        <form className="form-ki col-md-8" action="javascript:;" method="post">
          {/* update avatar */}
          <InputFile
            accept="image/*"
            label="Avatar"
            preview={
              this.state.avatar_preview || "/assets/4.2/img/avatar-1.jpg"
            }
            name="avatar"
            id="input-avatar"
            value={this.state.avatar || ""}
            validate={this.state.avatar_validate || {}}
            setState={(n, cb) => this.setState(n, cb)}
          />

          {/* end of udpate avatar */}

          {/* update username */}
          <InputText
            label="Username"
            name="username"
            type="text"
            id="input-username"
            value={this.state.username || ""}
            validate={this.state.username_validate || {}}
            required
            readOnly
            max={20}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* end of update username */}

          {/* update fullname */}
          <InputText
            label="Nama Lengkap"
            name="fullname"
            type="text"
            id="input-fullname"
            value={this.state.fullname || ""}
            validate={this.state.fullname_validate || {}}
            required
            max={100}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* end of update fullname */}

          {/* update address */}
          <Textarea
            label="Alamat Lengkap"
            note="Alamat ini dipakai untuk pengiriman hadiah atau hal lainnya dari Kompetisi Id. (Data alamat kamu tidak akan disebarkan ke publik)"
            name="address"
            max={500}
            value={this.state.address || ""}
            validate={this.state.addres_validate || {}}
            readOnly
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* end of update address */}

          <br />
          <BtnSubmit
            wrapperStyle={{ display: "inline-block", width: "initial" }}
            disabled={false}
            text={"Simpan perubahan"}
            loading={
              this.props.submitResponse.is_loading ||
              this.props.submitResponse.status === 200
            }
            action={() => this.submitHandler()}
            setState={(n, cb) => this.setState(n, cb)}
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    session: state.User.session,
    submitResponse: state.Others.setting_profile || {}
  }
}

export default connect(mapStateToProps)(SettingProfile)
