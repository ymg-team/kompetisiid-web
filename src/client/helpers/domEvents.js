// event to fire to valid DOM
export function eventFire(el, evType) {
  if (el.fireEvent) {
    el.fireEvent("on" + eventType)
  } else {
    const evObj = document.createEvent("Event")
    evObj.initEvent(evType, true, false)
    el.dispatchEvent(evObj)
  }
}

export function pushStyle(href, cb) {
  if (typeof window !== "undefined" && !isStyleLoaded(href)) {
    const l = document.createElement("link")
    l.setAttribute("rel", "stylesheet")
    l.setAttribute("href", href)
    if (cb) l.onload = cb()
    document.body.appendChild(l)
  }
}

export function pushScript(src, args = {}) {
  if (!isScriptLoaded(src)) {
    const s = document.createElement("script")
    if (args.id) s.setAttribute("id", args.id)
    s.setAttribute("src", src)
    if (args.cb) s.onload = args.cb
    document.body.appendChild(s)
  }
}

function isScriptLoaded(src) {
  const scripts = document.getElementsByTagName("script")
  // is script available
  for (let i = scripts.length; i--; ) {
    if (scripts[i].src == src) return true
  }

  return false
}

function isStyleLoaded(href) {
  if (typeof window !== "undefined") {
    const styles = document.querySelectorAll("link[rel='stylesheet']")
    // is css loaded
    for (let i = styles.length; i--; ) {
      if (styles[i].href == href) return true
    }
  }
}
