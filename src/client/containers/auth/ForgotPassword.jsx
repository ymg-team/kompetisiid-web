import React from "react"
import { connect } from "react-redux"
import { forgotPassword } from "../../../store/user/actions"

// components
import Input from "../../components/form/InputText"
import Submit from "../../components/form/Submit"
import { Link } from "react-router-dom"
import Helmet from "../../components/Helmet"
import { Fullscreen } from "../../components/Fullscreen"
import { LoginBoxStyled } from "./Login"

class ForgotPassword extends React.Component {
  state = {}

  forgotPasswordHandler() {
    this.props.dispatch(
      forgotPassword({ filter: "forgot_password", email: this.state.email })
    )
  }

  render() {
    const { response } = this.props
    const { email } = this.state
    const title = "Lupa Password",
      description = "Silahkan masukan email anda jika dan lupa password"
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
                  label="Email"
                  name="email"
                  type="email"
                  id="input-email"
                  value={email || ""}
                  validate={this.state.email_validate || {}}
                  setState={(n, cb) => this.setState(n, cb)}
                  required
                  autoFocus
                  autoComplete="off"
                />
              </div>
              <div className="form-child">
                <Submit
                  className="btn btn-gray"
                  disabled={loading}
                  action={() => this.forgotPasswordHandler()}
                  requiredInputs={["email"]}
                  setState={(n, cb) => this.setState(n, cb)}
                  type="submit"
                  style={{
                    fontWeight: "bold",
                    width: "100%",
                    backgroundColor: "#FFF",
                    color: "#292929"
                  }}
                  text={
                    loading ? "loading..." : "Kirim Permintaan Ganti Password"
                  }
                />
              </div>
            </form>
          </div>
          <div className="login-box__footer">
            <small>
              <Link to="/">ke Homepage</Link>
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
    response: state.Others.forgot_password || {}
  }
}

export default connect(mapStateToProps)(ForgotPassword)
