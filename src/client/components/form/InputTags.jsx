import React from "react"
import Styled from "styled-components"

const InputTagsStyled = Styled.div`
  .tagify {
    border: none;
    border-bottom: 2px solid #969696;
  }
`

class InputTags extends React.Component {
  state = {
    Tags: null
  }

  componentDidMount = () => {
    const { Tags } = require("../Tagify")
    setTimeout(() => {
      this.setState({ Tags })
    }, 1500)
  }

  tagifyAddHandler = e => {
    let {tags} = this.props 
    tags.push(e.detail.data.value)
    this.props.setState({[this.props.name]: tags})
  }

  tagifyRemoveHandler = e => {
    let {tags} = this.props 
    const index = tags.indexOf(e.detail.data.value)
    tags.splice(index, 1)
    this.props.setState({[this.props.name]: tags})
  }

  render = () => {
    // ref: https://github.com/yairEO/tagify#react
    const TagifySettings = {
      callbacks: {
        add: this.tagifyAddHandler,
        remove: this.tagifyRemoveHandler
      }
    }

    return (
      <InputTagsStyled className="form-child">
        <label htmlFor={this.props.id || this.props.name}>
          {this.props.label}{" "}
          {this.props.required ? <span className="text-red">*</span> : null}
        </label>
        {this.state.Tags ? (
          <this.state.Tags
            settings={TagifySettings}
            mode="input"
            name={this.props.name}
            initialValue={this.props.initialValue}
          />
        ) : null}
      </InputTagsStyled>
    )
  }
}

InputTags.defaultProps = {
  initialValue: "",
  tags: []
}

export default InputTags
