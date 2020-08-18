import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { emailVerification } from "../../../store/user/actions"

// components
import FullPageLoader from "../../components/preloaders/FullPage"
import Helmet from "../../components/Helmet"
import { Fullscreen } from "../../components/Fullscreen"
import { Link } from "react-router-dom"

const EmailVerificationPage = props => {
  const { user } = props
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // componentDidMount
    props.dispatch(emailVerification(props.match.params.token))
  }, [])

  useEffect(() => {
    if (user.etc.email_verification && user.etc.email_verification.status) {
      setLoading(false)
    }
  }, [props.user])

  return (
    <Fullscreen>
      <Helmet title={"Email sedang di verifikasi"} />
      {!loading ? (
        <div style={{ color: "#545454" }}>
          <h1>{user.etc.email_verification.message}</h1>
          <Link to="/">kembali ke Home</Link> |{" "}
          <Link to="/browse">Jelajah Kompetisi</Link> |{" "}
          <Link to="/add">Pasang Kompetisi</Link>
        </div>
      ) : (
        <h1>Email sedang di verifikasi</h1>
      )}
      <FullPageLoader show={loading} />
    </Fullscreen>
  )
}

const mapStateToProps = state => {
  return {
    user: state.User
  }
}

export default connect(mapStateToProps)(EmailVerificationPage)
