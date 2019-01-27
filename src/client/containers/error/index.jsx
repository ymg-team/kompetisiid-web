import React from 'react'
import FullPageError from "../../components/boxs/FullPageError"

export default (props) => {
  return (
    <FullPageError message={props.route.error_msg} code={props.route.error_code} />
  )
}
