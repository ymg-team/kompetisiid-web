import React from "react"
import { connect } from "react-redux"
import { changePassword } from "../../../store/user/actions"

// components
import Input from "../../components/form/InputText"
import Submit from "../../components/form/Submit"
import { Link } from "react-router-dom"
import Helmet from "../../components/Helmet"
import { Fullscreen } from "../../components/Fullscreen"
import { alert } from "../../components/Alert"
import { LoginBoxStyled } from "./Login"

class ForgotPassword extends React.Component {
  state = {}

  changePasswordHandler() {
    const { password, password_conf } = this.state
    if (password != password_conf) {
      // password not match
      alert(true, "Password konfirmasi tidak cocok", "error")
    } else {
      // start request to api
      this.props.dispatch(
        changePassword({
          filter: "change_password",
          password,
          password_conf,
          token: this.props.match.params.token
        })
      )
    }
  }

  render() {
    const { response } = this.props
    const { password, password_conf } = this.state
    const title = "Ganti Password",
      description =
        "Pastikan keamanan passwordmu, gunakan kombinasi angka, huruf dan simbol"
    const loading = response.is_loading || response.status == 200

    if (response.status && response.status == 200) {
      setTimeout(() => {
        location.href = "/"
      }, 1000)
    }

    return (
      <Fullscreen className="login">
        <Helmet title={title} description={description} />
        <LoginBoxStyled className="login-box">
          <div className="login-box__title">
            <h1 style={{ textAlign: "center", lineHeight: 1 }}>
              {title} <br />
              <small style={{ fontWeight: "normal" }}>{description}.</small>
            </h1>
          </div>
          <div className="login-box__content">
            <form className="form-ki" action="javascript:;" method="post">
              <div className="form-child">
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  id="input-password"
                  value={password || ""}
                  validate={this.state.password_validate || {}}
                  setState={(n, cb) => this.setState(n, cb)}
                  min={5}
                  max={20}
                  required
                  autoFocus
                  autoComplete="off"
                />
              </div>
              <div className="form-child">
                <Input
                  label="Konfirmasi Password"
                  name="password_conf"
                  type="password"
                  id="input-password-conf"
                  value={password_conf || ""}
                  validate={this.state.password_conf_validate || {}}
                  setState={(n, cb) => this.setState(n, cb)}
                  min={5}
                  max={20}
                  required
                  autoFocus
                  autoComplete="off"
                />
              </div>
              <div className="form-child">
                <Submit
                  className="btn btn-gray"
                  disabled={loading}
                  action={() => this.changePasswordHandler()}
                  requiredInputs={["password", "password_conf"]}
                  setState={(n, cb) => this.setState(n, cb)}
                  type="submit"
                  style={{
                    fontWeight: "bold",
                    width: "100%",
                    backgroundColor: "#FFF",
                    color: "#292929"
                  }}
                  text={loading ? "loading..." : "Ubah Password"}
                />
              </div>
            </form>
          </div>
          <div className="login-box__footer">
            <small>
              <Link to="/">ke Homepage</Link>
              {"| "}
              <Link to="/forgot-password">ke Lupa Password</Link>
              {"| "}
              <Link to="/login">ke Login</Link>
            </small>
          </div>
        </LoginBoxStyled>
      </Fullscreen>
    )
  }
}

const mapStateToProps = state => {
  return {
    response: state.Others.change_password || {}
  }
}

export default connect(mapStateToProps)(ForgotPassword)
