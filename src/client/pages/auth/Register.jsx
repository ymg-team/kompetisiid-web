import React, { Component } from "react"
import { connect } from "react-redux"
import { toCamelCase } from "string-manager"
import { resetValidator } from "../../components/form/Validator"
import { register } from "../../../store/user/actions"

// components
import Input from "../../components/form/InputText"
import InputFile from "../../components/form/InputFile"
import Submit from "../../components/form/Submit"
import { Link } from "react-router-dom"
import Helmet from "../../components/Helmet"
import { Fullscreen } from "../../components/Fullscreen"
import { LoginBoxStyled } from "./Login"
import AuthFacebook from "../../components/buttons/AuthFacebook"
import AuthGoogle from "../../components/buttons/AuthGoogle"

// list of required input
const requiredInput = [
  "email",
  "username",
  "password",
  "passwordconf",
  "avatar"
]

class Register extends Component {
  state = {
    avatar: {},
    username: "",
    password: "",
    passwordconf: "",
    fullname: "",
    avatarPreview: ""
  }

  UNSAFE_componentWillUpdate = (nextprops, nextstate) => {
    if (
      nextstate.avatar &&
      nextstate.avatar.lastModified !== this.state.avatar.lastModified
    ) {
      // ref: https://stackoverflow.com/a/36281449/2780875
      const reader = new FileReader()
      reader.readAsDataURL(nextstate.avatar)
      reader.onload = () => {
        this.setState({ avatarPreview: reader.result })
      }
    }
  }

  UNSAFE_componentWillReceiveProps = nextprops => {
    if (nextprops.response.status) {
      if (nextprops.response.status === 201) {
        setTimeout(() => {
          // register success, redirect to homepage
          location.href = "/"
        }, 1500)
      } else {
        this.setState({ loading: false })
      }
    }
  }

  componentWillUnmount() {
    resetValidator()
  }

  regHandler = () => {
    this.setState(
      {
        loading: true
      },
      () => {
        // generate params
        let params = {
          fullname: this.state.fullname,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }

        if (this.state.avatar.name) params.avatar = this.state.avatar

        console.log("request api to register...", params)
        this.props.dispatch(register(params))
      }
    )
  }

  render = () => {
    const {
      email,
      username,
      fullname,
      password,
      passwordconf,
      avatar,
      loading
    } = this.state
    const title = "Registrasi - Kompetisi Id"
    const description =
      "Yuk registrasi dan mengikuti berbagai kompetisi di Kompetisi Id, dan mari meramaikan semangat kompetisi di Indonesia"
    return (
      <Fullscreen className="login">
        <Helmet title={title} description={description} />
        <LoginBoxStyled className="login-box register-box">
          {/* header */}
          <div className="login-box__title">
            <h1 style={{ textAlign: "center", lineHeight: 1 }}>
              {title} <br />
              <small style={{ fontWeight: "normal" }}>{description}.</small>
            </h1>
          </div>
          {/* end of header */}

          {/* form input */}
          <div className="login-box__content">
            <form className="form-ki" action="#" method="post">
              {/* input avatar */}
              <div className="login-box__content__avatar">
                <p>
                  Halo <strong>{username || "kamu"}</strong>
                </p>
                <img
                  onClick={() => {
                    // trigger click input file
                    document.getElementById("input-avatar").click()
                  }}
                  src={
                    this.state.avatarPreview ||
                    "/assets/4.2/img/avatar-default.jpg"
                  }
                />
                <InputFile
                  customStyle={{ textAlign: "center" }}
                  customStyleInput={{
                    width: "auto",
                    background: "#ededed",
                    margin: "0 auto",
                    padding: "5px"
                  }}
                  name="avatar"
                  id="input-avatar"
                  value={avatar || ""}
                  validate={this.state.avatar_validate || {}}
                  required={true}
                  setState={(n, cb) => this.setState(n, cb)}
                />
              </div>
              {/* end of input avatar */}

              {/* input email */}
              <div className="form-child">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  id="input-email"
                  value={email || ""}
                  validate={this.state.email_validate || {}}
                  required={true}
                  setState={(n, cb) => this.setState(n, cb)}
                />
              </div>
              {/* end of input email */}

              {/* input username */}
              <div className="form-child">
                <Input
                  label="Username"
                  name="username"
                  type="text"
                  id="input-username"
                  value={username || ""}
                  validate={this.state.username_validate || {}}
                  required={true}
                  setState={(n, cb) => this.setState(n, cb)}
                  max={20}
                />
              </div>
              {/* end of input email */}

              {/* input fullname */}
              <div className="form-child">
                <Input
                  label="Nama Lengkap"
                  name="fullname"
                  type="text"
                  id="input-fullname"
                  value={fullname || ""}
                  validate={this.state.fullname_validate || {}}
                  setState={(n, cb) => this.setState(n, cb)}
                  max={100}
                />
              </div>
              {/* end of input fullname */}

              {/* input password */}
              <div className="form-child">
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  id="input-password"
                  value={password || ""}
                  validate={this.state.password_validate || {}}
                  required={true}
                  setState={(n, cb) => this.setState(n, cb)}
                />
              </div>
              {/* end of input password */}

              {/* input password confirmation */}
              <div className="form-child">
                <Input
                  label="Konfirmasi Password"
                  name="passwordconf"
                  type="password"
                  id="input-password-conf"
                  value={passwordconf || ""}
                  validate={this.state.passwordconf_validate || {}}
                  required={true}
                  setState={(n, cb) => this.setState(n, cb)}
                />
              </div>
              {/* end of input password confirmation */}

              {/* register submit button */}
              <div className="form-child">
                <Submit
                  className="btn btn-gray"
                  disabled={loading}
                  action={() => this.regHandler()}
                  requiredInputs={requiredInput}
                  setState={(n, cb) => this.setState(n, cb)}
                  type="submit"
                  style={{
                    fontWeight: "bold",
                    width: "100%",
                    backgroundColor: "#FFF",
                    color: "#292929"
                  }}
                  text={loading ? "loading..." : "Registrasi"}
                />
              </div>
              {/* end of register submit button */}
            </form>

            {/* oauth register */}
            {/* <span>
              <p>Atau masuk menggunakan</p>
              <div className="login-box__content__auth">
                <AuthFacebook isLoggedIn={false} />
                <AuthGoogle isLoggedIn={false} />
              </div>
            </span> */}
            {/* oauth register */}
          </div>
          {/* end of from input */}

          {/* footer navigation */}
          <div className="login-box__footer">
            <small>
              <Link to="/">Home</Link>
              {"| "}
              <a target="_blank" href="https://goo.gl/forms/kMGGZQXJCjoyKThj1">
                Kontak
              </a>
              {"| "}
              <a
                target="_blank"
                href="https://kompetisi.id/news/TVRjPQ/Privacy-Policy"
              >
                Privacy
              </a>
              {"| "}
              <a target="_blank" href="https://kompetisi.id/news/TXpVPQ/About">
                About
              </a>
            </small>
          </div>
          {/* end of footer navigation */}
        </LoginBoxStyled>
      </Fullscreen>
    )
  }
}

const mapStateToProps = state => {
  return {
    response: state.User.register
  }
}

export default connect(mapStateToProps)(Register)
