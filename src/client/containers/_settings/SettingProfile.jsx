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
        <Helmet title="Pengaturan Profil" />
        <HeaderDashboard title="Seting Profil" text="this is setting page" />

        <form className="form-ki col-md-8" action="javascript:;" method="post">
          {/* update avatar */}
          <InputFile 
            accept="image/*"
            label="Avatar"
            preview="/assets/4.2/img/avatar-1.jpg"
            name="poster"
            id="input-poster"
            value={this.state.poster || ""}
            validate={this.state.poster_validate || {}}
            // required={typeof this.props.competitionId === "undefined"}
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
            readOnly
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
