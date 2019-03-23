import React from "react"
import { EditorState, ContentState, convertToRaw, convertFromHTML } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import draftToHtml from "draftjs-to-html"
import Styled from "styled-components"
// import htmlToDraft from "html-to-draftjs"

import Loading from "../preloaders/GlobalLoader"

const EditorKIStyled = Styled.div`
  .ki-editor {
    max-height: 500px;
    border-bottom: 2px solid #969696;
  }
`

class EditorKI extends React.Component {
  state = {
    editorState: EditorState.createEmpty(), 
    ready: false
  }

  componentDidMount = () => {
    require("react-draft-wysiwyg/dist/react-draft-wysiwyg.css")
    setTimeout(() => {
      this.setState({ready: true}, () => {
        // console.log("value", this.props.value)
        if(this.props.value) {
          this.setState({
            editorState: EditorState.createWithContent(ContentState.createFromBlockArray(
              convertFromHTML(this.props.value)
            ))
          })
        }
      })
    }, 1200)
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    })
    this.props.setState({[this.props.name]: draftToHtml(convertToRaw(editorState.getCurrentContent()))})
  }

  render = () => {
    const { editorState } = this.state
    return (
      <EditorKIStyled className={`form-child`}>
        <label htmlFor={this.props.id || this.props.name}>
          {this.props.label}{" "}
          {this.props.required ? <span className="text-red">*</span> : null}
        </label>
        {
          this.state.ready ?
          <Editor
            editorState={editorState}
            wrapperClassName="ki-editor-wrapper"
            editorClassName="ki-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
          : <Loading />
        }
        {/* <textarea
          style={{display: "none"}}
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </EditorKIStyled>
    )
  }
}

export default EditorKI
