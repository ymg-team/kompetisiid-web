import React from "react"
import Button from "../../buttons/index"


const CONTACT_TYPE = [
  {
    type: "Facebook", icon: "",
    type: "Instagram", icon: "",
    type: "Youtube", icon: "",
    type: "Email", icon: "",
    type: "Telepon", icon: "",
    type: "Alamat", icon: "",
    type: "Web Link", icon: "",
  }
]

class ContactForm extends React.Component {
  state = {
    contacts: []
  }

  addContactHandler = () => {
    let {contacts} = this.state
    contacts.push({type: "facebook", value:""})
    return this.setState(contacts)
  }

  removeContactHandler = (key) => {
    let {contacts} = this.state
    contacts.splice(key, 1)
    return this.setState(contacts)
  }

  itemGenerator = (contact, key) => {
    return (
      <div key={key} className="row" style={{padding: "10px 0"}}>
        <div style={{paddingLeft: 0}} className="col-xs-4">
          <select className="form-child">
            {
              CONTACT_TYPE.map((n, key) => <option key={key} value={n.type}>{n.type}</option>)
            }
          </select>
        </div>
        <div className="col-xs-6">
          <input style={{padding:0, margin: 0}} className="form-child" type="text" />
        </div>
        <div className="col-xs-2">
          <Button onClick={() => this.removeContactHandler(key)} color={"red"}>X</Button>
        </div>
      </div>
    )
  }

  render = () => {
    return (
      <React.Fragment>
        {
          this.state.contacts.map((n, key) => {
            return this.itemGenerator(n, key)
          })
        }
        <div style={{paddingLeft: 0}} className="row col-xs-12">
          <Button onClick={() => this.addContactHandler()}> Tambahkan Kontak</Button>
        </div>
      </React.Fragment>
    )
  }
}

export default ContactForm
