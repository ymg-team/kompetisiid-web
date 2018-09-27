import React from "react"

// components
import SubHeader from "../../headers/SubHeader"
import Helmet from "../../Helmet"
import Input from "../../form/InputText"
import InputFile from "../../form/InputFile"
import Select from "../../form/Select"
class CompetitionForm extends React.Component {
  state = {}

  render() {
    const { id } = this.props
    let title = ""

    if (id) {
      title = "Update Kompetisi"
    } else {
      title = "Tambah Kompetisi"
    }

    return (
      <React.Fragment>
        <Helmet title={title} />
        <SubHeader
          customStyle={{ marginTop: "20px" }}
          customClass="row"
          customClassContent="row"
          title={title}
        />
        <form
          className="form-ki no-padding col-md-8"
          action="javascript:;"
          method="post"
        >
          {/* input text of judul */}
          <Input
            label="Judul Kompetisi"
            name="title"
            type="text"
            id="input-title"
            value={this.state.title || ""}
            validate={this.state.title_validate || {}}
            required={true}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* end of input file judul */}

          {/* input file of poster */}
          <InputFile
            label="Poster Kompetisi"
            name="poster"
            id="input-poster"
            value={this.state.poster || ""}
            validate={this.state.poster_validate || {}}
            required={true}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* end of input file of poster */}

          {/* main kategori */}
          <Select 
            label="Kategori Utama"
            name="mainkat"
          />
          {/* end of main kategori */}
        </form>
      </React.Fragment>
    )
  }
}

export default CompetitionForm
