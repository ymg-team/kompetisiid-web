import React from "react"
import Helmet from "../../../components/Helmet"
import Form from "../../../components/news/super/Form"
import { Prompt } from "react-router"
import { connect } from "react-redux"
import { fetchBeritaDetail } from "../../news/actions"
import FullPageLoader from "../../../components/preloaders/FullContentLoader"
import FullPageError from "../../../components/boxs/FullPageError"
import { alert } from "../../../components/Alert"

class NewsCreate extends React.Component {
  notSubmited = true

  componentDidMount = () => {
    const { id } = this.props.match.params
    if (id) {
      this.props.dispatch(fetchBeritaDetail(id))
    }
  }

  UNSAFE_componentWillReceiveProps = np => {
    if (np.others.news_form && np.others.news_form.message) {
      const { message, status } = np.others.news_form
      alert(
        true,
        message,
        status === 201 || status === 200 ? "success" : "error"
      )
      if (status === 201 || status === 200) {
        this.notSubmited = false
        location.href = "/_super/news"
      }
    }
  }

  render = () => {
    const { id } = this.props.match.params
    const newsData = this.props.news[id] || {}
    const title = id ? "Update Berita" : "Tambah Berita"

    if (id && newsData.status !== 200) this.notSubmited = false

    const response = this.props.others.news_form || {}

    return (
      <React.Fragment>
        <Helmet title={title} />
        <Prompt
          when={this.notSubmited}
          message={"Data berita yang kamu ketikan akan hilang, apakah yakin?"}
        />
        {(id && newsData.is_loading) || (id && !newsData.status) ? (
          <FullPageLoader />
        ) : id && newsData.status != 200 ? (
          <FullPageError code={newsData.status} message={newsData.message} />
        ) : (
          <Form
            response={response}
            title={title}
            newsId={id}
            dispatch={this.props.dispatch}
            newsData={newsData.data}
          />
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    news: state.Berita.detail,
    others: state.Others
  }
}

export default connect(mapStateToProps)(NewsCreate)
