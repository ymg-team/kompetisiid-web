import React from "react"
import { createNews, updateNews } from "../../../containers/news/actions"

// components
import HeaderDashboard from "../../cards/HeaderDashboard"
import SubHeader from "../../headers/SubHeader"
import TitleLevel2Box from "../../boxs/TitleLevel2"
import InputText from "../../form/InputText"
import InputFile from "../../form/InputFile"
import Editor from "../../form/Editor"
import InputTags from "../../form/InputTags"
import BtnSubmit from "../../form/Submit"
import Spacer from "../../boxs/Spacer"

class FormNews extends React.Component {
  static defaultProps = {
    response: {}
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    const { newsData, newsId } = this.props
    if (newsData && newsId) {
      let nextstate = {
        title: newsData.title,
        content: newsData.content,
        tags: newsData.tag ? newsData.tag.split(",") : []
      }

      this.setState(nextstate)
    }
  }

  submitHandler = () => {
    let formdata = {
      title: this.state.title,
      content: this.state.content,
      tags: this.state.tags ? this.state.tags.toString() : ""
    }

    if (this.state.image) formdata.image = this.state.image
    
    console.log("submit handler...", formdata)

    if(this.props.newsId) {
      // update news
      this.props.dispatch(updateNews(this.props.newsId, formdata))
    } else {
      // create news
      this.props.dispatch(createNews(formdata))
    }

  }

  render = () => {
    const { response } = this.props
    const loading =
      response.is_loading || response.status === 201 || response.status === 200
    return (
      <React.Fragment>
        <HeaderDashboard title={this.props.title} text="Menyampaikan berita-berita seputar kompetisi di Indonesia" />
        <form
          className="form-ki no-padding col-md-8"
          action="javascript:;"
          method="post"
        >
          <TitleLevel2Box
            title="Data Berita"
            text="Berita ini adalah asli dan apa adanya."
          />

          <InputText
            label="Judul Berita"
            name="title"
            type="text"
            id="input-title"
            value={this.state.title || ""}
            validate={this.state.title_validate || {}}
            placeholder="Masukan judul berita disini"
            required={true}
            setState={(n, cb) => this.setState(n, cb)}
          />

          <InputFile
            label="Gambar Berita"
            name="image"
            id="input-image"
            value={this.state.image || ""}
            validate={this.state.image_validate || {}}
            required={typeof this.props.newsId === "undefined"}
            setState={(n, cb) => this.setState(n, cb)}
          />

          <Editor
            label="Isi Berita"
            name="content"
            required={true}
            value={this.state.content}
            setState={(n, cb) => this.setState(n, cb)}
          />

          <InputTags
            label="Masukan Tag"
            name="tags"
            tags={this.state.tags || []}
            initialValue={this.state.tags}
            setState={(n, cb) => this.setState(n, cb)}
          />

          <Spacer size="large" />

          <BtnSubmit
            disabled={loading}
            text={loading ? "loading..." : this.props.title}
            action={() => this.submitHandler()}
            setState={(n, cb) => this.setState(n, cb)}
          />
        </form>
      </React.Fragment>
    )
  }
}

export default FormNews
