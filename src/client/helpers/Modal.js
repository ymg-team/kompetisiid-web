/**
 * init modal image event listener
 */
let isShow = false

export function initModalImages() {
  document.addEventListener("click", e => {
    if (e.target.className.indexOf("image-modal-target") > -1) {
      // toggle show modal
      isShow = true
      return toggleModalImages(e.target.src)
    } else {
      if (isShow) {
        isShow = false
        return toggleModalImages(e.target.src)
      }
    }
  })
}

/**
 * function to to toggle modal images on / off
 * @param {string} src source target from clicked image
 */

export function toggleModalImages(src = "") {
  const el = document.getElementById("image-modal")
  if (src) {
    // show modal and update background image
    el.style.visibility = "visible"
    el.style.opacity = 1
    el.childNodes[0].style.backgroundImage = `url(${src})`
    document.body.style.overflow = "hidden"
  } else {
    // hide modal
    el.style.opacity = 0
    el.style.visibility = "hidden"
    el.childNodes[0].style.backgroundImage = ""
    document.body.style.overflow = "auto"
  }
}
