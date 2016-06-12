import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TinyMCE from 'react-tinymce'

import { actions as documentActions } from 'store/modules/document'

import styles from './styles.scss'

export class DocumentContent extends React.Component {
  static propTypes = {
    doc: PropTypes.object.isRequired,
    editable: PropTypes.bool,
    updateDocument: PropTypes.func.isRequired
  };

  static defaultProps = {
    editable: false
  };

  constructor (props) {
    super(props)
    this.handleEditorChange = this.handleEditorChange.bind(this)
  }

  handleEditorChange (e) {
    const { updateDocument, doc } = this.props
    updateDocument(doc, {content: e.target.getContent()})
  }

  renderEditMode () {
    const { doc } = this.props
    const config = {
      plugins: 'link image code',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
    }
    return (
      <TinyMCE
        content={doc.content}
        config={config}
        onChange={this.handleEditorChange}
      />
    )
  }

  renderViewMode () {
    const { doc } = this.props
    return (
      <div
        ref='content'
        className={styles.content}
        dangerouslySetInnerHTML={{__html: doc.content}}
      />
    )
  }

  render () {
    const { editable } = this.props
    return editable ? this.renderEditMode() : this.renderViewMode()
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(Object.assign({}, documentActions), dispatch)
)

export default connect(null, mapDispatchToProps)(DocumentContent)