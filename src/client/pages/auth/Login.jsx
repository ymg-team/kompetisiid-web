import React from "react"
import Styled from "styled-components"
import { fullPageLoader } from "../../components/preloaders/FullPage"
import { connect } from "react-redux"
import { resetValidator } from "../../components/form/Validator"
import { queryToObj } from "string-manager"

// components
import Input from "../../components/form/InputText"
import Submit from "../../components/form/Submit"
import { Link } from "react-router-dom"
import Helmet from "../../components/Helmet"
// import AuthFacebook from "../../components/buttons/AuthFacebook"
// import AuthGoogle from "../../components/buttons/AuthGoogle"
import { Fullscreen } from "../../components/Fullscreen"
import { alert } from "../../components/Alert"
import { login } from "../../../store/user/actions"

export const LoginBoxStyled = Styled.div`

  &.register-box {
    /* because in register box if user tap avatar, will convert to browse file */
    .login-box__content__avatar {
      img {
        cursor: pointer;
        border: solid 2px #F4F4F4;
        height: 90px;
        width: 90px;
      }
    }
  }

  .login-box__footer {
    width: 100%;
    text-align: center;
    padding: 10px;
  }
`

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      inputPassword: false,
      profile: {},
      isSuperPage: this.props.location.pathname === "/super"
    }
  }

  handleLogin() {
    if (!this.state.password) {
      if (this.state.username.trim() != "")
        this.setState({ inputPassword: true })
    } else {
      fullPageLoader(true)
      this.setState({ loading: true }, () => {
        // request to login user
        this.props.dispatch(
          login({
            username: this.state.username,
            password: this.state.password
          })
        )
      })
    }
  }

  componentWillUnmount() {
    resetValidator()
  }

  UNSAFE_componentWillReceiveProps(np) {
    const { username } = this.state

    if (
      np.profile[username] &&
      np.profile[username] != this.props.profile["username"]
    ) {
      this.setState({
        loading: false,
        profile: np.profile[username]
      })
    }

    if (np.login && np.login.status) {
      if (np.login.status === 200) {
        // login success
        alert(
          true,
          `Login sukses, selamat datang kembali "${np.login.data.username}"`,
          "success",
          true
        )
        // redirect to /super/dashboard
        setTimeout(() => {
          const query = queryToObj(this.props.location.search)
          location.href = this.state.isSuperPage
            ? "/super/dashboard"
            : query.ref
            ? query.ref
            : `/`
        }, 1000)
      } else {
        // user and password not match
        fullPageLoader(false)
        alert(
          true,
          np.login.message || "User dan password tidak cocok",
          "error"
        )
        this.setState({
          loading: false
        })
      }
    }
  }

  render() {
    const { username, password, loading } = this.state
    const { profile, login } = this.props
    const is_userfound =
      profile[username] &&
      profile[username].meta &&
      profile[username].meta.code == 200

    //generate alert
    if (profile[username] && profile[username].meta) {
      if (profile[username].meta.code != 200)
        alert(true, "user tidak terdaftar", "error")
      else alert(false)
    }

    let title = "Login"
    let description = "Mari ramaikan semangat kompetisi di Indonesia."

    if (this.state.isSuperPage) {
      title = "Halaman Super"
      description = "Selalu jaga rahasia anda demi keamanan di Kompetisi.id"
    }

    // remove auto complete using dom: solving issue #189
    if (this.state.inputPassword) {
      // trigger esc button
      setTimeout(() => {
        document
          .getElementById("input-password")
          .dispatchEvent(new KeyboardEvent("keypress", { keyCode: 27 }))
      }, 500)
    }

    return (
      <Fullscreen
        className={`login ${this.state.isSuperPage ? "login-_super" : ""}`}
      >
        <Helmet title={title} description={description} />
        <LoginBoxStyled className="login-box">
          {/* header */}
          <div className="login-box__title">
            <h1 style={{ textAlign: "center", lineHeight: 1 }}>
              {title} <br />
              <small style={{ fontWeight: "normal" }}>{description}.</small>
            </h1>
          </div>

          {/* form input */}
          <div className="login-box__content">
            {this.state.inputPassword ? (
              <div className="login-box__content__avatar">
                <p>
                  Halo <strong>{this.state.username}</strong>
                  &nbsp;
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      this.setState({
                        inputPassword: false,
                        password: null,
                        password_validate: null
                      })
                    }}
                  >
                    ubah
                  </a>
                </p>
                <img src="/assets/4.2/img/avatar-default.jpg" />
              </div>
            ) : null}
            <form
              className="form-ki"
              action="#"
              onSubmit={e => {
                e.preventDefault()
              }}
              method="post"
            >
              <div className="form-child">
                {this.state.inputPassword ? (
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    id="input-password"
                    value={password || ""}
                    validate={this.state.password_validate || {}}
                    required={true}
                    setState={(n, cb) => this.setState(n, cb)}
                    autoFocus={true}
                    autoComplete="off"
                  />
                ) : (
                  <Input
                    label="Email / username"
                    name="username"
                    type="text"
                    id="input-username"
                    value={username || ""}
                    validate={this.state.username_validate || {}}
                    required={true}
                    setState={(n, cb) => this.setState(n, cb)}
                    autoFocus={true}
                    autoComplete="off"
                  />
                )}
              </div>
              <div className="form-child">
                <Submit
                  className="btn btn-gray"
                  disabled={loading}
                  action={() => this.handleLogin()}
                  requiredInputs={["username"]}
                  setState={(n, cb) => this.setState(n, cb)}
                  type="submit"
                  style={{
                    fontWeight: "bold",
                    width: "100%",
                    backgroundColor: "#FFF",
                    color: "#292929"
                  }}
                  text={loading ? "loading..." : "login"}
                />
              </div>
            </form>
            {!is_userfound
              ? !this.state.isSuperPage
                ? null // <span>
                : //   <p>Atau masuk menggunakan</p>
                  //   <div className="login-box__content__auth">
                  //     <AuthFacebook />
                  //     <AuthGoogle />
                  //   </div>
                  // </span>
                  null
              : null}
            <hr />
            {!this.state.isSuperPage ? (
              <p>
                Belum punya akun, silahkan{" "}
                <Link to="/register">Register Disini</Link> atau{" "}
                <Link to="/forgot-password">Lupa password</Link>
              </p>
            ) : null}
          </div>

          {/* footer navigation */}
          <div className="login-box__footer">
            <small>
              <Link to="/">ke Home</Link>
              {"| "}
              <a target="_blank" href="https://goo.gl/forms/kMGGZQXJCjoyKThj1">
                Kontak
              </a>
              {"| "}
              <a
                href="https://kompetisi.id/news/TVRjPQ/Privacy-Policy"
                target="_blank"
              >
                Privacy
              </a>
              {"| "}
              <a href="https://kompetisi.id/news/TXpVPQ/About" target="_blank">
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

function mapStateToProps(state) {
  const { User } = state
  return {
    profile: User.profile,
    login: User.login
  }
}

export default connect(mapStateToProps)(Login)
