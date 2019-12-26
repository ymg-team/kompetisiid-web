import React, { Component } from "react"
import { alert } from "../Alert"
import { oauthLogin } from "../../../store/user/actions"
import { fullPageLoader } from "../preloaders/FullPage"
import { connect } from "react-redux"

class AuthFacebook extends Component {
  
  static defaultProps = {
    isLoggedIn: true
  }
  
  
  state = {
    response: {},
    disabled: true
  }

  componentDidMount() {
    setTimeout(() => {
      // check FB login status
      // ref: https://stackoverflow.com/a/16559767/2780875
      FB.getLoginStatus(response => {
        this.setState({ response, disabled: false })
      })
    }, 1500)
  }

  reqToApi(fbResponse = {}) {
    console.log("fbResponse", fbResponse)

    if(this.props.isLoggedIn) {
      this.props.dispatch(
        oauthLogin({
          provider: "facebook",
          user_id: fbResponse.authResponse.userID,
          token: fbResponse.authResponse.accessToken
        })
      )
    }

  }

  clickHandler() {
    fullPageLoader(true)
    // ref: https://developers.facebook.com/docs/facebook-login/web/
    switch (this.state.response.status) {
      case "connected":
        return this.reqToApi(this.state.response)

      case "not_authorized":
      default:
        FB.login(
          response => {
            fullPageLoader(false)
            if (response.status == "connected") {
              return this.reqToApi(response)
            }
          },
          { scope: "public_profile,email" }
        )
        break
    }
  }

  render = () => {
    return (
      <a
        disabled={this.state.disabled}
        href="#"
        onClick={(e) => {
          e.preventDefault()
          this.clickHandler()
        }}
      >
        <img src="/assets/4.2/img/facebook-icon.png" />
      </a>
    )
  }
}

export default connect()(AuthFacebook)
