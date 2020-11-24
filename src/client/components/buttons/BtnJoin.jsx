import React from "react"
import { getCompetitionStatus } from "../../helpers/dateTime"
import { alert } from "../Alert"

export default props => {
  const { is_ended, is_waiting } = getCompetitionStatus(
    props.data.deadline_at,
    props.data.announcement_at
  )
  return (
    <a
      id={props.id}
      style={{ marginRight: "10px" }}
      onClick={e => {
        if (is_ended || is_waiting) {
          e.preventDefault()
          alert(true, "Pendaftaran sudah ditutup", "error")
        }
      }}
      href={is_ended ? "#" : props.data.link_join || props.data.link_source}
      target="_blank"
      className={`btn btn-join btn-lg ${
        is_ended || is_waiting == "berakhir" ? "btn-gray" : "btn-green"
      }`}
    >
      {is_ended || is_waiting ? "Pendaftaran Ditutup" : "Registrasi Di Sini"}
    </a>
  )
}
