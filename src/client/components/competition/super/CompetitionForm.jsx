import React from "react"
import { getCategories } from "../../../containers/competition/actions"
import { dateToFormat } from "../../../helpers/DateTime"

// components
import TitleLevel2Box from "../../boxs/TitleLevel2"
import SubHeader from "../../headers/SubHeader"
import Helmet from "../../Helmet"
import Input from "../../form/InputText"
import Textarea from "../../form/Textarea"
import InputFile from "../../form/InputFile"
import InputTags from "../../form/InputTags"
import Select from "../../form/Select"
import DatePicker from "../../form/DatePicker"
import BtnSubmit from "../../form/Submit"
import Spacer from "../../boxs/Spacer"
import Contact from "./ContactForm"
import Editor from "../../form/Editor"

class CompetitionForm extends React.Component {
  state = {}

  componentDidMount = () => {
    this.props.dispatch(getCategories())
  }

  submitHandler = () => {
    let formdata = {
      title: this.state.title,
      description: this.state.description,
      prize_total: this.state.prize_total,
      prize_description: this.state.prize_description,
      organizer: this.state.organizer,
      deadline_date: dateToFormat(this.state.deadline),
      announcement_date: dateToFormat(this.state.announcement),
      main_cat: this.state.maincat,
      sub_cat: this.state.subcat,
      source_link: this.state.source_link || "",
      register_link: this.state.register_link || "",
      contacts: JSON.stringify(this.state.contacts || []),
      tags: this.state.tags ? this.state.tags.toString() : "",
      content: this.state.content
    }

    if (this.state.poster) formdata.poster = this.state.poster

    console.log("submit handler...", formdata)
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
            value={this.state.deadline || ""}
            validate={this.state.deadline_validate || {}}
            required={true}
            config={{
              minDate: new Date()
            }}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* end of deadline competition */}

          {/* pengumuman */}
          <DatePicker
            label="Pengumuman"
            name="announcement"
            value={this.state.announcement || ""}
            validate={this.state.announcement_validate || {}}
            required={true}
            config={{
              minDate: new Date()
            }}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* pengumuman */}

          {/* main kategori */}
          {this.props.categories.status ? (
            <Select
              label="Kategori Utama"
              name="maincat"
              required={true}
              options={this.props.categories.data}
              value={this.state.maincat}
              valueKey="id"
              textKey="name"
              validate={this.state.maincat_validate || {}}
              setState={(n, cb) => this.setState(n, cb)}
            />
          ) : (
            <p>Loading available categories...</p>
          )}
          {/* end of main kategori */}

          {/* sub kategori */}
          {this.state.maincat && this.state.maincat != 0 ? (
            <Select
              label="Sub Kategori"
              name="subcat"
              required={true}
              options={
                this.props.categories.data.find(n => n.id == this.state.maincat)
                  .subcategories
              }
              value={this.state.subcat}
              valueKey="id"
              textKey="name"
              validate={this.state.subcat_validate || {}}
              setState={(n, cb) => this.setState(n, cb)}
            />
          ) : null}
          {/* end of subkategori */}

          {/* peraturan */}
          <Editor
            label="Peraturan kompetisi"
            description="Berisi syarat, ketentuan, mekanisme dan hal-hal lain yang berkaitan untuk ikut serta kompetisi ini"
            name="content"
            required={true}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* peraturan */}

          <Spacer size="large" />

          <TitleLevel2Box
            title="Hadiah Kompetisi"
            text="Cantumkan perkiraan nilai total hadiah dan detail hadiah untuk para pemenang."
          />

          {/* input nilai total hadiah */}
          <Input
            label="Nilai total hadiah (dalam Rp)"
            name="prize_total"
            type="number"
            id="input-prize-total"
            value={this.state.prize_total || 0}
            validate={this.state.prize_total_validate || {}}
            placeholder="Contoh: 1000000 (hanya masukan angka)"
            required={true}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* end of input nilai total hadiah */}

          {/* input deskripsi hadiah */}
          <Textarea
            label="Deskripsi hadiah"
            name="prize_description"
            id="input-prize-description"
            value={this.state.prize_description || ""}
            validate={this.state.prize_description_validate || {}}
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
          <Contact
            contacts={this.state.contacts || []}
            setState={(val, cb) => this.setState(val, cb)}
          />
          {/*end of input contact*/}

          <Spacer size="large" />

          <TitleLevel2Box title="Opsional" />
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

          {/* input competition tag */}
          <InputTags
            label="Masukan Tag"
            name="tags"
            tags={this.state.tags || []}
            setState={(n, cb) => this.setState(n, cb)}
          />
          {/* end of input competition tag */}

          <Spacer size="large" />

          {/* submit form */}
          <BtnSubmit
            text={title}
            action={() => this.submitHandler()}
            setState={(n, cb) => this.setState(n, cb)}
            requiredInputs={["maincat", "subcat"]}
          />
          {/* end of submit form */}
        </form>
      </React.Fragment>
    )
  }
}

export default CompetitionForm
