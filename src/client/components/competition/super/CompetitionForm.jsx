import React from "react"

// components
import SubHeader from "../../headers/SubHeader"
import Helmet from "../../Helmet"
import Input from "../../form/InputText"

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
          className="form-ki no-padding col-md-8 col-lg-10"
          action="javascript:;"
          method="post"
        >
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
        </form>
      </React.Fragment>
    )
  }
}

export default CompetitionForm
