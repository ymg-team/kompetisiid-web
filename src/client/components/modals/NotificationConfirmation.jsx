import React from "react"
import Styled from "styled-components"
import { alert } from "../Alert"
import notification from "../../helpers/browserNotification"

// components
import Modal from "./index"
import Button from "../buttons/index"

const NotificationConfirmationStyled = Styled.div`
  max-width: 100%;
  padding: 10px !important;
  button {
    margin-right: 10px;
  }
`
// ref : https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission
const notificationPermissionHandler = () => {
  const { notificationCallback = () => {} } = window
  delete window.notificationCallback

  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    return alert(
      true,
      "Browser kamu tidak support untuk notifikasi, silahkan update atau ganti browser lain",
      "error"
    )
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // do callback
    return notificationCallback()
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function(permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        new notification("Sukses", {
          body: "Tunggu pemberitahuan dari KI ya ;)"
        })
        // do callback
        return notificationCallback()
      }
    })
  } else {
    return alert(
      true,
      "Kamu tidak memberikan akses notifikasi untuk Kompetisi Id. Cek kembali setingan browser kamu",
      "error"
    )
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

const NotificationConfirmation = props => {
  return (
    <Modal className="modal-white" id="notification-confirmation">
      <NotificationConfirmationStyled className="modal-white-content">
        <div>Mengizinkan Kompetisi Id akses notifikasi</div>
        <br />
        <Button
          color="green"
          size="small"
          text="izinkan"
          onClick={() => {
            modal("close", "notification-confirmation")
            notificationPermissionHandler()
          }}
        />
        <Button
          onClick={() => modal("close", "notification-confirmation")}
          color="red"
          size="small"
          text="batalkan"
        />
      </NotificationConfirmationStyled>
    </Modal>
  )
}

export default NotificationConfirmation
