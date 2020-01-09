/**
 * Created by yussan on 15/10/16.
 */
import React, { Component } from "react"
import Input from "../components/form/Input"
import Helmet from "react-helmet"
import { Link } from "react-router-dom"
import Validator from "../helpers/Validator"
import Text from "../components/LoginText"

import { alert } from "../components/Alert"
import { register } from "../../store/user/actions"
import { connect } from "react-redux"

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is_accept: false,
      onprogress: false,
      username: "",
      email: "",
      password: "",
      password_confirmation: ""
    }
  }

  componentDidMount() {
    document.getElementsByTagName("body")[0].style.background =
      "rgb(31, 31, 31)"
  }

  componentWillUnmount() {
    document.getElementsByTagName("body")[0].style.background = "#FFF"
  }

  UNSAFE_componentWillReceiveProps(np) {
    if (np.register.meta) {
      this.setState(
        {
          onprogress: false
        },
        () => {
          if (np.register.meta.code === 201) {
            setTimeout(() => {
              alert(false)
              window.location.href = "/"
            }, 1500)
            alert(true, np.register.meta.message, "success", false)
          } else {
            alert(true, np.register.meta.message, "error", false)
          }
        }
      )
    }
  }

  handleChangeAccept() {
    return this.setState({ is_accept: !this.state.is_accept })
  }

  handleRegister() {
    if (Validator.validateSubmit()) {
      const { username, email, password, password_confirmation } = this.state
      console.log('"yeah formdata is valid !"')
      this.setState(
        {
          onprogress: true
        },
        () => {
          this.props.dispatch(
            register({
              username,
              email,
              password,
              password_confirmation
            })
          )
        }
      )
    } else {
      alert(true, "Isian kamu belum lengkap", "error")
    }
  }

  changeState(key, val) {
    return this.setState({ [key]: val })
  }

  render() {
    return (
      <div className="container">
        <Helmet
          title="Register - Kompetisi ID"
          description="Mendaftarkan akun baru di Kompetisi ID"
        />
        <div className="col-md-12 full-body-header">
          <Link to="/">
            <img src="/assets/images/logo.png" />
          </Link>
        </div>
        <div className="col-md-7">
          <Text />
        </div>
        <div className="col-md-5">
          <div className="login-box">
            <form
              method="POST"
              action="#"
              onSubmit={e => {
                e.preventDefault()
              }}
            >
              <h2>Mendaftarkan akun baru</h2>
              <Input
                label="username."
                type="text"
                name="username"
                required={true}
                value={this.state.username}
                validate={
                  this.state.validate_username
                    ? this.state.validate_username
                    : {}
                }
                min={0}
                max={20}
                custom_class="form-control"
                changeState={(key, val) =>
                  this.changeState(
                    key,
                    key === "username" ? val.replace(/\s/g, "") : val
                  )
                }
              />
              <Input
                label="email."
                type="email"
                name="email"
                required={true}
                value={this.state.email}
                validate={
                  this.state.validate_email ? this.state.validate_email : {}
                }
                min={0}
                max={100}
                custom_class="form-control"
                changeState={(key, val) => this.setState({ [key]: val })}
              />
              <Input
                label="password."
                type="password"
                name="password"
                required={true}
                value={this.state.password}
                validate={
                  this.state.validate_password
                    ? this.state.validate_password
                    : {}
                }
                min={0}
                max={50}
                custom_class="form-control"
                changeState={(key, val) => this.setState({ [key]: val })}
              />
              <Input
                label="ulangi password."
                type="password"
                name="password_confirmation"
                required={true}
                value={this.state.password_confirmation}
                validate={
                  this.state.validate_password_confirmation
                    ? this.state.validate_password_confirmation
                    : {}
                }
                min={0}
                max={50}
                custom_class="form-control"
                changeState={(key, val) => this.setState({ [key]: val })}
              />
              <div className="checkbox">
                <label>
                  <input
                    onChange={this.handleChangeAccept.bind(this)}
                    type="checkbox"
                    defaultValue="ingat saya"
                  />
                  Saya menyetujui{" "}
                  <a target="_blank" href="/">
                    syarat dan ketentuan
                  </a>
                </label>
              </div>
              <br />
              <button
                disabled={this.state.onprogress || !this.state.is_accept}
                onClick={() => this.handleRegister()}
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                daftar
              </button>
              <div className="text-center">
                <small className="text-muted">
                  sudah punya akun silahkan <Link to="/login">masuk</Link>{" "}
                  disini
                </small>
              </div>
            </form>
          </div>
          {/*<div className="oauth-box">*/}
          {/*<a className="facebook" title="mendaftar dengan facebook"><img src="/assets/images/icon-fb.png" title="login dengan Facebook" />facebook</a>*/}
          {/*</div>*/}
          <div className="text-center">
            <small className="white-text">
              Kompetisi copyright © Id More 2016
            </small>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    register: state.User.register
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
