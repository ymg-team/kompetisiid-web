import React from "react"
import Button from "../../buttons/index"

const CONTACT_TYPE = [
  {
    id: 1,
    type: "Web Link",
    icon: ""
  },
  {
    id: 2,
    type: "Facebook",
    icon: ""
  },
  {
    id: 3,
    type: "Twitter",
    icon: ""
  },
  {
    id: 4,
    type: "Instagram",
    icon: ""
  },
  {
    id: 5,
    type: "Google Plus",
    icon: ""
  },
  {
    id: 6,
    type: "Email",
    icon: ""
  },
  {
    id: 7,
    type: "Alamat",
    icon: ""
  },
  {
    id: 8,
    type: "Youtube",
    icon: ""
  },
  {
    id: 9,
    type: "Telepon",
    icon: ""
  }
]

class ContactForm extends React.Component {
  addContactHandler = () => {
    let { contacts } = this.props
    contacts.push({ type: 1, value: "" })
    return this.props.setState({contacts})
  }

  removeContactHandler = key => {
    let { contacts } = this.props
    contacts.splice(key, 1)
    return this.props.setState(contacts)
  }

  changeSelectHandler = (e, key) => {
    let { contacts } = this.props
    contacts[key].type = e.target.value 

    return this.props.setState({contacts})
  }

  changeInputHandler = (e, key) => {
    let { contacts } = this.props
    contacts[key].value = e.target.value 
    return this.props.setState({contacts})
  }

  itemGenerator = (n = {}, key) => {
    return (
      <div key={key} className="row" style={{ padding: "10px 0" }}>
        <div style={{ paddingLeft: 0 }} className="col-xs-4">
          <select
            className="form-child"
            onChange={e => this.changeSelectHandler(e, key)}
            value={n.type || ""}
          >
            {CONTACT_TYPE.map((n, key) => {
              return (
                <option key={key} value={n.id}>
                  {n.type}
                </option>
              )
            })}
          </select>
        </div>
        <div className="col-xs-6">
          <input
            onChange={e => this.changeInputHandler(e, key)}
            style={{ padding: 0, margin: 0 }}
            className="form-child"
            type="text"
            value={n.value || ""}
          />
        </div>
        <div className="col-xs-2">
          <Button onClick={() => this.removeContactHandler(key)} color={"red"}>
            X
          </Button>
        </div>
      </div>
    )
  }

  render = () => {
    return (
      <React.Fragment>
        {this.props.contacts.map((n, key) => {
          return this.itemGenerator(n, key)
        })}
        <div style={{ paddingLeft: 0 }} className="row col-xs-12">
          {this.props.contacts.length > 0 ? <br /> : null}
          <Button onClick={() => this.addContactHandler()}>
            {" "}
            + Tambahkan Kontak
          </Button>
        </div>
      </React.Fragment>
    )
  }
}

export default ContactForm
