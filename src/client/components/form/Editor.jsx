import React from "react"
import { EditorState, ContentState, convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import Styled from "styled-components"

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
    ready: false,
    editor: null
  }

  componentDidMount = () => {
    require("react-draft-wysiwyg/dist/react-draft-wysiwyg.css")
    const { Editor } = require("react-draft-wysiwyg")
    const htmlToDraft = require("html-to-draftjs")
    this.setState(
      {
        editor: Editor
      },
      () => {
        setTimeout(() => {
          this.setState({ ready: true }, () => {
            if (this.props.value) {
              this.setState({
                editorState: EditorState.createWithContent(
                  ContentState.createFromBlockArray(
                    htmlToDraft.default(this.props.value || "")
                  )
                )
              })
            }
          })
        }, 1200)
      }
    )
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    })
    this.props.setState({
      [this.props.name]: draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      )
    })
  }

  render = () => {
    const { editorState } = this.state
    return (
      <EditorKIStyled className={`form-child`}>
        <label htmlFor={this.props.id || this.props.name}>
          {this.props.label}{" "}
          {this.props.required ? <span className="text-red">*</span> : null}
        </label>
        {this.state.ready && this.state.editor ? (
          <this.state.editor
            editorState={editorState}
            wrapperClassName="ki-editor-wrapper"
            editorClassName="ki-editor"
            onEditorStateChange={this.onEditorStateChange}
            stripPastedStyles
          />
        ) : (
          <Loading />
        )}
      </EditorKIStyled>
    )
  }
}

export default EditorKI
