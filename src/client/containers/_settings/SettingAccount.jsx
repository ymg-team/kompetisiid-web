import React from "react"
import { connect } from "react-redux"
import Styled from "styled-components"

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

  render() {
    return (
      <div>
        <Helmet title="Pengaturan Akun" />
        <HeaderDashboard title="Seting Akun" text="this is setting page" />

        <form className="form-ki col-md-8" action="javascript:;" method="post">
          {/* update email */}
          <InputText
            label="Email"
            name="email"
            type="email"
            id="input-email"
            value={this.state.email || ""}
            validate={this.state.email_validate || {}}
            max={20}
            setState={(n, cb) => this.setState(n, cb)}
            required
          />
          {/* end of update email */}

          {/* update password */}
          <InputText
            label="Konfimasi Password Baru"
            note="Kosongkan jika tidak ingin update password"
            name="new_password"
            type="text"
            id="input-new-password"
            value={this.state.new_password || ""}
            validate={this.state.new_password_validate || {}}
            max={50}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* update of update password */}

          {/* new password conf */}
          {this.state.new_password ? (
            <InputText
              label="Password Baru"
              name="new_password_conf"
              type="text"
              id="input-new-password-conf"
              value={this.state.new_password_conf || ""}
              validate={this.state.new_password_conf_validate || {}}
              max={50}
              setState={(n, cb) => this.setState(n, cb)}
            />
          ) : null}
          {/* end of new password conf */}

          <hr />

          {/* inser password before save */}
          <InputText
            label="Password"
            note="Masukan password untuk menyimpan perubahan"
            name="password"
            type="text"
            id="input-password"
            value={this.state.password || ""}
            validate={this.state.password_validate || {}}
            max={50}
            setState={(n, cb) => this.setState(n, cb)}
            required
          />

          <br />
          <BtnSubmit
            wrapperStyle={{ display: "inline-block", width: "initial" }}
            disabled={false}
            text={"Simpan perubahan"}
            action={() => {}}
            setState={(n, cb) => this.setState(n, cb)}
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    session: state.User.session
  }
}

export default connect(mapStateToProps)(SettingProfile)
