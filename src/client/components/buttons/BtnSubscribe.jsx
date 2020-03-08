import React from "react"
import { subscribeCompetition } from "../../pages/competition/actions"

export default ({ data, dispatch, authData }) => {
  const clickHandler = e => {
    e.preventDefault()

    if (authData && authData.id) {
      const permission = Notification.permission
      if (!("Notification" in window)) {
        return alert(
          true,
          "Browser kamu tidak support untuk notifikasi, silahkan update atau ganti browser lain",
          "error"
        )
      }

      if (permission === "granted") {
        return dispatch(subscribeCompetition(data.id))
      } else if (permission === "default") {
        window.notificationCallback = function() {
          return dispatch(subscribeCompetition(data.id))
        }
        modal("open", "notification-confirmation")
      } else {
        return alert(
          true,
          "Kamu tidak memberikan akses notifikasi untuk Kompetisi Id. Cek kembali setingan browser kamu",
          "error"
        )
      }
    } else {
      return transitionTo("/login")
    }
  }

  return (
    <a
      href="#"
      onClick={e => clickHandler(e)}
      className={`btn btn-lg btn-white`}
    >
      {data.is_subscribed ? "Unsubscribe" : "Subscribe"}
    </a>
  )
}
