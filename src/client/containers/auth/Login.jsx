import React, { Component } from 'react'
import { fullPageLoader } from '../../components/preloaders/FullPage'

// components
import Input from '../../components/form/InputText'
import Button from '../../components/form/Button'
import { Link } from 'react-router-dom'
import Helmet from '../../components/Helmet'
import AuthFacebook from '../../components/buttons/AuthFacebook'
import AuthGoogle from '../../components/buttons/AuthGoogle'
import { Fullscreen } from '../../components/Fullscreen'
import { alert } from '../../components/Alert'
import { profile, login } from '../../../store/user/actions'
import { connect } from 'react-redux'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      inputPassword: false,
      profile: {},
      isSuperPage: this.props.location.pathname === '/super'
    }
  }

  handleLogin() {
    if (!this.state.password) {
      if (this.state.username.trim() != '')
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

  componentWillReceiveProps(np) {
    const { username } = this.state
    if (
      np.profile[username] &&
      np.profile[username] != this.props.profile['username']
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
          'success',
          true
        )
        // redirect to dashboard
        setTimeout(() => {
          location.href = this.state.isSuperPage ? '/super/dashboard' : '/dashboard'
        }, 1500)
      } else {
        // user and password not match
        fullPageLoader(false)
        alert(true, 'User dan password tidak cocok', 'error')
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
        alert(true, 'user tidak terdaftar', 'error')
      else alert(false)
    }

    let title = 'Login'
    let description = 'Mari ramaikan semangat kompetisi di Indonesia.'

    if (this.state.isSuperPage) {
      title = 'Halaman Super'
      description = 'Selalu jaga rahasia anda demi keamanan di Kompetisi.id'
    }

    return (
      <Fullscreen className={`login ${this.state.isSuperPage ? 'login-super' : ''}`}>
        <Helmet title={title} description={description} />
        <div className="login-box">
          {/* header */}
          <div className="login-box__title">
            <h1 style={{ textAlign: 'center', lineHeight: 1 }}>
              {title} <br />
              <small style={{ fontWeight: 'normal' }}>{description}.</small>
            </h1>
          </div>

          {/* form input */}
          <div className="login-box__content">
            {this.state.inputPassword ? (
              <div className="login-box__content__avatar">
                <p>
                  Halo <strong>{this.state.username}</strong>
                </p>
                <img src="/assets/4.2/img/default-avatar.jpg" />
              </div>
            ) : null}
            <form className="form-ki" action="javascript:;" method="post">
              <div className="form-child">
                {this.state.inputPassword ? (
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    id="input-password"
                    value={password || ''}
                    validate={this.state.password_validate || {}}
                    required={true}
                    setState={(n, cb) => this.setState(n, cb)}
                  />
                ) : (
                  <Input
                    label="Email / username"
                    name="username"
                    type="text"
                    id="input-username"
                    value={username || ''}
                    validate={this.state.username_validate || {}}
                    required={true}
                    setState={(n, cb) => this.setState(n, cb)}
                  />
                )}
              </div>
              <div className="form-child">
                <Button
                  className="btn btn-gray"
                  disabled={loading}
                  action={() => this.handleLogin()}
                  requiredInputs={['username', 'password']}
                  setState={(n, cb) => this.setState(n, cb)}
                  type="submit"
                  style={{
                    fontWeight: 'bold',
                    width: '100%',
                    backgroundColor: '#FFF',
                    color: '#292929'
                  }}
                  text={loading ? 'loading...' : 'login'}
                />
              </div>
            </form>
            {!is_userfound ? (
              !this.state.isSuperPage ? (
                <span>
                  <p>Atau masuk menggunakan</p>
                  <div className="login-box__content__auth">
                    <AuthFacebook />
                    <AuthGoogle />
                  </div>
                </span>
              ) : null
            ) : (
              <Link to="/register">Lupa password</Link>
            )}
            <hr />
            {!this.state.isSuperPage ? (
              <p>
                Belum punya akun, silahkan{' '}
                <Link to="/register">Regiser Disini</Link>
              </p>
            ) : null}
          </div>

          {/* footer navigation */}
          <div className="login-box__footer">
            <small>
              <Link to="/">Home</Link>
            </small>
            <small>
              <a target="_blank" href="https://goo.gl/forms/kMGGZQXJCjoyKThj1">
                Kontak
              </a>
            </small>
            <small>
              <Link to="/">Privacy</Link>
            </small>
            <small>
              <Link to="/news/TXpVPQ/About">About</Link>
            </small>
          </div>
        </div>
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

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
