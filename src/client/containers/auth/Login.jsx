import React, { Component } from 'react'
import Input from '../../components/form/InputText'
import Button from '../../components/form/Button'
import { Link } from 'react-router-dom'
import Helmet from '../../components/Helmet'
import AuthFacebook from '../../components/buttons/AuthFacebook'
import AuthGoogle from '../../components/buttons/AuthGoogle'
import { Fullscreen } from '../../components/Fullscreen'

import { profile, login } from '../../../store/user/actions'
import { connect } from 'react-redux'


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onprogress: false,
      profile: {}
    }
  }

  handleLogin() {
    const { username, password } = this.state
    this.setState({
      onprogress: true
    }, () => {
      if (!password)//check username
      {
        //check username
        if (username) this.props.dispatch(profile(username))
      } else {
        //do login
        this.props.dispatch(login({ username, password }))

      }
    })
  }

  componentWillReceiveProps(np) {
    const { username } = this.state
    if (np.profile[username] && (np.profile[username] != this.props.profile['username'])) {
      this.setState({
        onprogress: false,
        profile: np.profile[username]
      })
    }

    if (np.login && np.login.meta) {
      this.setState({
        onprogress: false
      })
    }

  }

  render() {
    const { username, password, onprogress } = this.state
    const { profile, login } = this.props
    const is_userfound = profile[username] && profile[username].meta && profile[username].meta.code == 200

    //generate alert
    if (profile[username] && profile[username].meta) {
      if (profile[username].meta.code != 200)
        fullalert('error', 'user tidak terdaftar')
      else
        fullalert('close')
    }
    if (login && login.meta) {
      if (login.meta.code != 201) {
        fullalert('error', 'password tidak cocok')
      } else {
        fullalert('success', 'login berhasil')
        setTimeout(() => { location.href = '/dashboard/competition' }, 500)
      }
    }
    return (
      <Fullscreen className='login'>
        <Helmet
          title='Masuk - Kompetisi Indonesia'
          description='input username dan password kamu untuk mendapat akses lebih di Kompetisi Indonesia'
        />
        <div className='login-box'>
          <div className='login-box__title'>
            <h1 style={{ textAlign: 'center', lineHeight: 1 }}>Masuk ke KI  <br /><small style={{ fontWeight: 'normal' }}>Mari ramaikan semangat kompetisi di Indonesia.</small></h1></div>
          <div className='login-box__content'>
            {
              is_userfound ?
                <div className="login-box__content__avatar">
                  <p>Halo <strong>{username}</strong></p>
                  <img src="/assets/4.2/img/default-avatar.jpg" />
                </div>
                : null
            }
            <form
              className='form-ki form-ki__white'
              action='javascript:;'
              method='post'>
              <div className='form-child'>
                {is_userfound ?
                  <Input
                    label='Password'
                    name='password'
                    type='password'
                    id='input-password'
                    value={password || ''}
                    validate={this.state.password_validate || {}}
                    required={true}
                    setState={(n, cb) => this.setState(n, cb)}
                  /> :
                  <Input
                    label='Email / username'
                    name='username'
                    type='text'
                    id='input-username'
                    value={username || ''}
                    validate={this.state.username_validate || {}}
                    required={true}
                    setState={(n, cb) => this.setState(n, cb)}
                  />}

              </div>
              <div className='form-child'>
                <Button
                  className='btn btn-borderwhite'
                  disabled={onprogress}
                  action={() => this.handleLogin()}
                  requiredInputs={['username', 'password']}
                  setState={(n, cb) => this.setState(n, cb)}
                  type='submit'
                  style={{ fontWeight: 'bold', width: '100%', backgroundColor: '#FFF', color: '#292929' }}
                  text={onprogress ? 'loading...' : 'login'}
                />
              </div>
            </form>
            {!is_userfound ?
              <span>
                <p>Atau masuk menggunakan</p>
                <div className='login-box__content__auth'>
                  <AuthFacebook />
                  <AuthGoogle />
                </div>
              </span>
              : <Link to='/register'>Lupa password</Link>}
            <hr />
            <p>Belum punya akun, silahkan <Link to='/register'>Regiser Disini</Link></p>
          </div>
          <div className='login-box__footer'>
            <small>
              <Link to='/'>Home</Link>
            </small>
            <small>
              <a target='_blank' href='https://goo.gl/forms/kMGGZQXJCjoyKThj1'>Kontak</a>
            </small>
            <small>
              <Link to='/'>Privacy</Link>
            </small>
            <small>
              <Link to='/news/TXpVPQ/About'>About</Link>
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
