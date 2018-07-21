import React from 'react'

/**
 * Created by yussan on 18/12/16.
 */
export function findStr(needle, haystack) {
  return needle.indexOf(haystack) !== -1
}

/**
 * text parser for post detail
 * @param {String} text
 */
export function textParser(text = '') {
  text = parseUrl(text)
  return text
}

/**
 * parse url http:// , https://, ftp:// to hyperlink
 * @param {String} text
 */
function parseUrl(text = '') {
  text = text.replace(
    /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])(?![^<>]*>)/gim,
    function(t) {
      if (t.search('https://kompetisi.id') === 0) {
        return `<a href="${t}">${t}</a>`
      } else {
        return `<a target='_blank' rel='noopener' href='/exit?to=${t}'>${t}</a>`
      }
    }
  )
  return text
}

/**
 * function to conver /n to <br />
 * @param {String} text
 * @tutorial : https://medium.com/@kevinsimper/react-newline-to-break-nl2br-a1c240ba746
 */
export function nl2br(text) {
  return text.split('\n').map((item, key) => {
    return (
      <span key={key}>
        {item}
        <br />
      </span>
    )
  })
}
