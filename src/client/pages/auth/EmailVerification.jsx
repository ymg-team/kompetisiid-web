import React from "react"
import { connect } from "react-redux"
import { emailVerification } from "../../../store/user/actions"

// components
import FullPageLoader from "../../components/preloaders/FullPage"
import Helmet from "../../components/Helmet"
import { Fullscreen } from "../../components/Fullscreen"
import { Link } from "react-router-dom"

class EmailVerification extends React.Component {
  state = {
    loading: true
  }

  componentDidMount = () => {
    this.props.dispatch(emailVerification(this.props.match.params.token))
  }

  UNSAFE_componentWillReceiveProps = np => {
    if(np.user.etc.email_verification && np.user.etc.email_verification.status) {
      this.setState({loading: false})
    }
  }

  render = () => {
    return (
      <Fullscreen>
        <Helmet title={"Email sedang di verifikasi"} />
        {!this.state.loading ? (
          <div style={{color: "gray"}}>
            <h1>{this.props.user.etc.email_verification.message}</h1>
            <Link to="/">kembali ke Home</Link> |{" "}
            <Link to="/browse">Jelajah Kompetisi</Link> |{" "}
            <Link to="/add">Pasang Kompetisi</Link>
          </div>
        ) : (
          <h1>Email sedang di verifikasi</h1>
        )}
        <FullPageLoader show={this.state.loading} />
      </Fullscreen>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.User
  }
}

export default connect(mapStateToProps)(EmailVerification)
