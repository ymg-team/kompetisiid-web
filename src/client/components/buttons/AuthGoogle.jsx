import React, { Component } from "react"
import { oauthLogin } from "../../containers/user/actions"
import { fullPageLoader } from "../preloaders/FullPage"
import { connect } from "react-redux"
import { alert } from "../Alert"

class AuthGoogle extends Component {
  state = {
    auth2: null
  }

  componentDidMount = () => {
    setTimeout(() => {
      gapi.load("auth2", () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        const auth2 = gapi.auth2.init({
          client_id:
            "825189798997-4gtj3pdnfpj2gvkvad6984emfg67kvec.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin"
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        })

        this.setState({ auth2 })
        // attachSignin(document.getElementById("googleBtn"))
      })
    }, 1500)
  }

  reqToApi(googleResponse = {}) {
    // user_id: profile.getId(),
    // name: profile.getGivenName(),
    // family_name: profile.getGivenName(),
    // avatar: profile.getImageUrl(),
    // email: profile.getImageUrl()

    this.props.dispatch(
      oauthLogin({
        provider: "google",
        user_id: googleResponse.getId()
      })
    )
  }

  clickHandler = () => {
    fullPageLoader(true)
    // ref : https://developers.google.com/identity/sign-in/web/people
    const { auth2 } = this.state

    auth2.signOut()

    if (auth2) {
      if (auth2.isSignedIn.get()) {
        // get user data to request api
        const profile = auth2.currentUser.get().getBasicProfile()
        return this.reqToApi(profile)
      } else {
        auth2.signIn({scope: 'profile email'}).then(() => {
          const profile = auth2.currentUser.get().getBasicProfile()
          return this.reqToApi(profile)
        }).catch(e => {
          // get the error and close window auth
          console.log(e) 
          fullPageLoader(false)
        })
      }
    } else {
      fullPageLoader(false)
      alert(true, "Terjadi masalah, silahkan coba beberapa saat lagi", "error")
    }
  }

  render() {
    return (
      <a onClick={() => this.clickHandler()} href="javascript:;">
        <img src="/assets/4.2/img/google-icon.png" />
      </a>
    )
  }
}

export default connect()(AuthGoogle)
