import React from "react"
import { getCategories } from "../../../containers/competition/actions"

// components
import TitleLevel2Box from "../../boxs/TitleLevel2"
import SubHeader from "../../headers/SubHeader"
import Helmet from "../../Helmet"
import Input from "../../form/InputText"
import Textarea from "../../form/Textarea"
import InputFile from "../../form/InputFile"
import Select from "../../form/Select"
import DatePicker from "../../form/DatePicker"
import BtnSubmit from "../../form/Submit"
import Spacer from "../../boxs/Spacer"
import Contact from "./ContactForm"

class CompetitionForm extends React.Component {
  state = {
  }

  componentDidMount = () => {
    this.props.dispatch(getCategories())
  }

  submitHandler = () => {
    console.log("submit handler...")
  }

  render = () => {
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
          <TitleLevel2Box 
            title="Data Kompetisi"
            text="Pastikan memasukan data selengkap mungkin untuk memudahkan pengunjung memahami mekanisme kompetisi yang bersangkutan."
          />

          {/* input text of judul */}
          <Input
            label="Judul Kompetisi"
            name="title"
            type="text"
            id="input-title"
            value={this.state.title || ""}
            validate={this.state.title_validate || {}}
            placeholder="Masukan judul kompetisi disini"
            required={true}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* end of input file judul */}

          {/* input description */}
          <Textarea
            label="Deskripsi Singkat Kompetisi"
            name="description"
            id="input-description"
            value={this.state.description || ""}
            validate={this.state.description_validate || {}}
            placeholder="Buat deskripsi singkat seputar kompetisi ini untuk menarik para peserta"
            required={true}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* end of input description */}

          {/* penyelenggara kompetisi */}
          <Input
            label="Penyelenggara Kompetisi"
            name="organizer"
            type="text"
            id="input-organizer"
            value={this.state.organizer || ""}
            validate={this.state.organizer_validate || {}}
            placeholder="Masukan nama penyelenggara kompetisi"
            required={true}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* end of penyelenggara kompetisi */}

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

          {/* deadline competition */}
          <DatePicker
            label="Deadline"
            name="deadline"
            required={true}
            config={{
              minDate: new Date()
            }}
            validate={this.state.deadline_validate || {}}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* end of deadline competition */}

          {/* pengumuman */}
          <DatePicker
            label="Pengumuman"
            name="announcement"
            required={true}
            config={{
              minDate: new Date()
            }}
            validate={this.state.announcement_validate || {}}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* pengumuman */}

          {/* main kategori */}
          {this.props.categories.status ? (
            <Select
              label="Kategori Utama"
              name="mainkat"
              required={true}
              options={this.props.categories.data}
              value={this.state.mainkat}
              valueKey="id"
              textKey="name"
              validate={this.state.mainkat_validate || {}}
              setState={(n, cb) => this.setState(n, cb)}
            />
          ) : (
            <p>Loading available categories...</p>
          )}
          {/* end of main kategori */}

          {/* sub kategori */}
          {
            this.state.mainkat && this.state.mainkat != 0 ?
              <Select
                label="Sub Kategori"
                name="subkat"
                required={true}
                options={(this.props.categories.data.find(n => n.id == this.state.mainkat)).subcategories}
                value={this.state.subkat}
                valueKey="id"
                textKey="name"
                validate={this.state.subkat_validate || {}}
                setState={(n, cb) => this.setState(n, cb)}
              />
            : null
          }
          {/* end of subkategori */}

          {/* peraturan */}
          {/* peraturan */}

          <Spacer size="large" />


          <TitleLevel2Box 
            title="Hadiah Kompetisi"
            text="Cantumkan perkiraan nilai total hadiah dan detail hadiah untuk para pemenang."
          />

          {/* input nilai total hadiah */}
          <Input
            label="Nilai total hadiah (dalam Rp)"
            name="price_total"
            type="number"
            id="input-price-total"
            value={this.state.price_total || 0}
            validate={this.state.price_total_validate || {}}
            placeholder="Contoh: 1000000 (hanya masukan angka)"
            required={true}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* end of input nilai total hadiah */}

          {/* input deskripsi hadiah */}
          <Textarea
            label="Deskripsi hadiah"
            name="price_description"
            id="input-price-description"
            value={this.state.price_description || ""}
            validate={this.state.price_description_validate || {}}
            placeholder="Contoh: Juara 1 mendapatkan... , dst"
            required={true}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* end of input deskripsi hadiah */}

          <Spacer size="large" />

          <TitleLevel2Box
            title="Kontak Penyelenggara"
            text="Kontak yang memungkinkan para peserta kompetisi untuk terhubung langsung dengan Penyelenggara"
          />
          {/*input contact*/}
          <Contact contact={this.state.contact} setState={(val, callback) => this.setState(val, callback)} />
          {/*end of input contact*/}

          <Spacer size="large" />

          <TitleLevel2Box
            title="Opsional"
          />
          {/*input link join competition*/}
          <Input
            label="Link Mendaftar Kompetisi"
            name="link_join"
            type="text"
            id="input-link-join-competition"
            value={this.state.link_join || ""}
            validate={this.state.link_join_validate || {}}
            placeholder="https://"
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/*end of input link join competition*/}

          {/*link competition source*/}
          <Input
            label="Link Sumber Kompetisi"
            name="link_source"
            type="text"
            id="input-link-source-competition"
            value={this.state.link_source || ""}
            validate={this.state.link_source_validate || {}}
            placeholder="https://"
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/*end of link competition source*/}

          <Spacer size="large" />


          {/* submit form */}
          <BtnSubmit 
            text={title}
            action={() => this.submitHandler()}
            setState={(n, cb) => this.setState(n, cb)}
            requiredInputs={[
              "title"
            ]}
          />
          {/* end of submit form */}
        </form>
      </React.Fragment>
    )
  }
}

export default CompetitionForm
