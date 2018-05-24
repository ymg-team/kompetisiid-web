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
    /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
    function(t) {
      return `<a target='_blank' rel='noopener' href='${t}'>${t}</a>`
    }
  )
  return text
}
