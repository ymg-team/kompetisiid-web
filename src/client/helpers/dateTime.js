/**
 * Created by yussan on 28/02/17.
 */

export const Month = [
  ["jan", "januari"],
  ["feb", "februari"],
  ["mar", "maret"],
  ["apr", "april"],
  ["mei", "mei"],
  ["jun", "juni"],
  ["jul", "juli"],
  ["agu", "agustus"],
  ["sep", "september"],
  ["okt", "oktober"],
  ["nov", "november"],
  ["des", "desember"]
]

// ref : https://www.samclarke.com/javascript-convert-time-ago-future/
export function epochToRelativeTime(epochtime) {
  const lang = lang || {
    postfixes: {
      "<": " lagi",
      ">": " lalu"
    },
    1000: {
      singular: "beberapa saat",
      plural: "beberapa saat"
    },
    60000: {
      singular: "semenit",
      plural: "# menit"
    },
    3600000: {
      singular: "sejam",
      plural: "# jam"
    },
    86400000: {
      singular: "sehari",
      plural: "# hari"
    },
    2592000000: {
      singular: "sebulan",
      plural: "# bulan"
    },
    31540000000: {
      singular: "setahun",
      plural: "# tahun"
    }
  }

  const now = Date.now()
  const timespans = [1000, 60000, 3600000, 86400000, 2592000000, 31540000000]
  let timeDifference = now - epochtime * 1000
  const postfix = lang.postfixes[timeDifference < 0 ? "<" : ">"]
  let timespan = timespans[0]

  if (timeDifference < 0) timeDifference = timeDifference * -1

  for (let i = 1; i < timespans.length; i++) {
    if (timeDifference > timespans[i]) {
      timespan = timespans[i]
    }
  }

  // remove number after coma
  const n = parseInt(timeDifference / timespan)

  return lang[timespan][n > 1 ? "plural" : "singular"].replace("#", n) + postfix
}

export function getCompetitionStatus(deadline_at, announcement_at) {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  const now = d.getTime()
  deadline_at = deadline_at * 1000
  announcement_at = announcement_at * 1000
  const is_ended = deadline_at < now && announcement_at < now
  const is_waiting = deadline_at < now && announcement_at > now

  return { is_ended, is_waiting, now, deadline_at, announcement_at }
}

export function datetimeToRelativeTime(datetime) {
  const date = new Date(datetime)
  return epochToRelativeTime(date)
}

export function epochToDMY(epochtime) {
  const d = new Date(epochtime)
  return `${d.getDate()} ${Month[d.getMonth()][1]} ${d.getFullYear()}`
}

export function strToDateTime(str) {
  return ""
}

export function dateToFormat(date, format) {
  const d = new Date(date)
  switch (format) {
    case "Y-m-d":
    default:
      return `${d.getFullYear()}-${
        d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
      }-${d.getDate()}`
  }
}

export function today(format = "") {
  const d = new Date()
  switch (format) {
    case "Y-m-d":
      return `${d.getFullYear()}-${
        d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
      }-${d.getDate()}`
    case "Y-m-d h:i:s":
      return `${d.getFullYear()}-${
        d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
      }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    default:
      return `${d.getDate()} ${Month[d.getMonth()][0]} ${d.getFullYear()}`
  }
}

/**
 * function to convert datetime into ISO 8601
 * @date {number} sample : 2019-01-26 00:00:00
 */
// export function epochToISO8061(epochtime) {
//   return ``
// }
