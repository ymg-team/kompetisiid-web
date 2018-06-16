import React, {Component} from 'react'
import {connect} from 'react-redux'


class SuperContainer extends Component {
  render(){
    return (
      <p>This is container of Super Page</p>
    )
  }
}

export default connect()(SuperContainer)
