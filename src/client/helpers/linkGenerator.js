import React from "react"

/**
 * Created by yussan on 21/10/16.
 */
export function singleLink(id, title, prefix) {
  return `/${prefix}/${id}/${title}`
}

export function generateLink(link, target = "_self") {
  if (link.search("http") > -1 && link.search("https://kompetisi.id") < 0) {
    return (
      <a href={link} target={target}>
        {link}
      </a>
    )
  } else {
    return <a href={link}>{link}</a>
  }
}

export function isHttps(link) {
  if (link.search("https") > -1) {
    return true
  } else {
    return false
  }
}

export function openInNewTab(url) {
  return window.open(url, "_blank").focus()
}
